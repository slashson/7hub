/* Interactive 360° panorama viewer for the two tour cards.
   Renders the equirectangular photo (window.PANO_SRC, set by pano-data.js)
   with a fullscreen-quad fragment shader — no geometry, no dependencies.
   - auto-rotates slowly on its own
   - drag (mouse/touch) to look around; auto-rotation pauses while you interact
     and resumes a few seconds after you let go. */
(function () {
  'use strict';

  var VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
  var FRAG = [
    'precision highp float;',
    'uniform sampler2D tex; uniform vec2 res; uniform float yaw, pitch, fov;',
    '#define PI 3.14159265359',
    'void main(){',
    '  vec2 uv = (gl_FragCoord.xy / res) * 2.0 - 1.0;',
    '  float aspect = res.x / res.y;',
    '  float f = tan(fov * 0.5);',
    '  vec3 d = normalize(vec3(uv.x * f * aspect, uv.y * f, -1.0));',
    '  float cp = cos(pitch), sp = sin(pitch);',
    '  d = vec3(d.x, d.y * cp - d.z * sp, d.y * sp + d.z * cp);',  // pitch (around X)
    '  float cy = cos(yaw), sy = sin(yaw);',
    '  d = vec3(d.x * cy + d.z * sy, d.y, -d.x * sy + d.z * cy);',  // yaw (around Y)
    '  float lon = atan(d.x, -d.z);',
    '  float lat = asin(clamp(d.y, -1.0, 1.0));',
    '  gl_FragColor = texture2D(tex, vec2(lon / (2.0 * PI) + 0.5, 0.5 - lat / PI));',
    '}'
  ].join('\n');

  function sh(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return s;
  }

  function initViewer(canvas, img) {
    var gl = canvas.getContext('webgl', { antialias: true, alpha: false }) ||
             canvas.getContext('experimental-webgl');
    if (!gl) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);          // seamless 360° wrap (POT texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    var uRes = gl.getUniformLocation(prog, 'res');
    var uYaw = gl.getUniformLocation(prog, 'yaw');
    var uPitch = gl.getUniformLocation(prog, 'pitch');
    var uFov = gl.getUniformLocation(prog, 'fov');

    var yaw = 0, pitch = 0, fov = 1.15;   // ~66° vertical FOV
    var auto = true, last = 0, resumeT = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = canvas.clientWidth || 438, h = canvas.clientHeight || 480;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function frame(t) {
      var dt = last ? (t - last) / 1000 : 0; last = t;
      if (auto) yaw += 0.07 * dt;          // slow drift, rad/s
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uYaw, yaw);
      gl.uniform1f(uPitch, pitch);
      gl.uniform1f(uFov, fov);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(frame);
    }

    var dragging = false, lx = 0, ly = 0, perPx = 0.0025;
    function pt(e) { return e.touches && e.touches[0] ? e.touches[0] : e; }
    function down(e) {
      dragging = true; auto = false; clearTimeout(resumeT);
      var p = pt(e); lx = p.clientX; ly = p.clientY;
      var r = canvas.getBoundingClientRect();
      perPx = fov / r.height;              // rad per on-screen px (scale-correct)
      canvas.style.cursor = 'grabbing';
    }
    function move(e) {
      if (!dragging) return;
      var p = pt(e);
      yaw += (p.clientX - lx) * perPx;   // inverted left/right per request (up/down unchanged)
      pitch = Math.max(-1.3, Math.min(1.3, pitch + (p.clientY - ly) * perPx));
      lx = p.clientX; ly = p.clientY;
      if (e.cancelable) e.preventDefault();
    }
    function up() {
      if (!dragging) return;
      dragging = false; canvas.style.cursor = 'grab';
      resumeT = setTimeout(function () { auto = true; }, 3500);   // resume drift after inactivity
    }

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    canvas.addEventListener('touchstart', down, { passive: true });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', up);

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  }

  function start() {
    var canvases = [].slice.call(document.querySelectorAll('canvas.m-pano'));
    var srcs = window.PANO_SRCS || (window.PANO_SRC ? [window.PANO_SRC] : []);
    if (!canvases.length || !srcs.length) return;
    // Each card shows its own panorama (data URI → same-origin, no WebGL taint).
    canvases.forEach(function (c, i) {
      var src = srcs[i] || srcs[srcs.length - 1];
      var img = new Image();
      img.onload = function () { initViewer(c, img); };
      img.src = src;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
