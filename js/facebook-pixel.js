/* Meta Pixel — base install. Pixel ID: 4432915776813934.
   Loads fbevents.js and fires a PageView on every page load.
   Included on every page via <script src="js/facebook-pixel.js"></script> in <head>.
   Custom events (Contact, Lead, ViewContent, Purchase, …) are a later stage. */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '4432915776813934');
fbq('track', 'PageView');
