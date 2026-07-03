/* Language switching (UKR / RU / ENG).
   All translatable copy lives here, keyed by CSS selector, so the markup
   stays untouched except for the .lang-btn switcher. Each entry:
   { s: selector, h: true if innerHTML (has inline markup), uk/ru/en: text }. */
(function () {
  'use strict';

  var ENTRIES = [
    // ---- Hero ----
    { s: '.sec--hero .hero-head', h: true,
      uk: '<span class="hl hl-32">Мережа квартир</span> <span class="hl hl-32">одного стандарту</span> <span class="hl em-serif hl-36">приміщень</span> <span class="hl em-serif hl-36">за однією адресою.</span>',
      ru: '<span class="hl hl-32">Сеть квартир</span> <span class="hl hl-32">одного стандарта</span> <span class="hl em-serif hl-36">помещений</span> <span class="hl em-serif hl-36">по одному адресу.</span>',
      en: '<span class="hl hl-32">A network of flats</span> <span class="hl hl-32">of one standard —</span> <span class="hl em-serif hl-36">same rooms,</span> <span class="hl em-serif hl-36">one address.</span>' },
    { s: '.badge-week', uk: 'тиждень', ru: 'неделя', en: 'week' },
    { s: '.badge-uah',  uk: 'грн',     ru: 'грн',    en: 'UAH'  },
    { s: '.badge-incl', uk: 'Все включено', ru: 'Всё включено', en: 'All included' },
    { s: '.hero-sub', h: true,
      uk: '<span class="em-32">Простір для тимчасового проживання.</span><br>Без господарів. Без агенцій. Без комісій.',
      ru: '<span class="em-32">Пространство для временного проживания.</span><br>Без хозяев. Без агентств. Без комиссий.',
      en: '<span class="em-32">A space for temporary stays.</span><br>No hosts. No agencies. No fees.' },

    // ---- Shared "Забронювати в Telegram" (hero / steps / fab) ----
    { s: '.cta-label, .steps__cta-label, .fab__label',
      uk: 'Забронювати в Telegram', ru: 'Забронировать в Telegram', en: 'Book on Telegram' },

    // ---- Main / gallery ----
    { s: '.m-label', uk: 'Повний огляд квартири 360°', ru: 'Полный обзор квартиры 360°', en: 'Full 360° apartment tour' },
    { s: '.m-subtitle', uk: 'Потягніть, щоб роздивитися кожну кімнату', ru: 'Потяните, чтобы осмотреть каждую комнату', en: 'Drag to look around each room' },
    { s: '.pano-hint', uk: '↔ Потягніть', ru: '↔ Потяните', en: '↔ Drag' },
    { s: '.m-card-a .pano-room', uk: 'Вітальня', ru: 'Гостиная', en: 'Living room' },
    { s: '.m-card-b .pano-room', uk: 'Санвузол', ru: 'Санузел', en: 'Bathroom' },
    // NB: .m-gallery-label is driven by gallery.js (the caption follows the
    // open photo), so it is intentionally NOT keyed here.
    { s: '.m-caption', h: true,
      uk: 'Усі квартири відповідають фотографіям<br>та доступні для самостійного заселення.',
      ru: 'Все квартиры соответствуют фотографиям<br>и доступны для самостоятельного заселения.',
      en: 'All apartments match the photos<br>and are available for self check-in.' },

    // ---- Advantages (5 cards) ----
    { s: '.adv__title',    uk: 'Переваги проживання', ru: 'Преимущества проживания', en: 'Why you’ll love it' },
    { s: '.adv__subtitle', uk: 'Справжнє житло, а не готельний номер', ru: 'Настоящее жильё, а не гостиничный номер', en: 'A real home, not a hotel room' },

    { s: '.adv__card--1 .adv__name', uk: 'Справжні апартаменти', ru: 'Настоящие апартаменты', en: 'Real apartments' },
    { s: '.adv__card--1 .adv__desc',
      uk: 'Не готельний номер, а повноцінний простір для життя — з власною кухнею, санвузлом і всім необхідним.',
      ru: 'Не гостиничный номер, а полноценное пространство для жизни с собственной кухней, санузлом и всем необходимым.',
      en: 'Not a hotel room, but a full living space — with its own kitchen, bathroom and everything you need.' },

    { s: '.adv__card--2 .adv__name', uk: 'Живіть як удома', ru: 'Живите как дома', en: 'Live like home' },
    { s: '.adv__card--2 .adv__desc',
      uk: 'Готуйте, періть, працюйте, відпочивайте та живіть у звичному ритмі — без обмежень готельного формату.',
      ru: 'Готовьте, стирайте, работайте, отдыхайте и живите в привычном ритме без ограничений гостиничного формата.',
      en: 'Cook, do laundry, work, relax and live at your own pace — with none of the limits of a hotel.' },

    { s: '.adv__card--3 .adv__name', uk: 'Вища ймовірність заселення', ru: 'Выше вероятность заселения', en: 'Higher chance of a room' },
    { s: '.adv__card--3 .adv__desc',
      uk: 'Сім однакових студій працюють як єдиний простір. Якщо одна зайнята, часто знайдеться інша з таким самим рівнем комфорту.',
      ru: 'Семь одинаковых студий работают как единое пространство. Если одна студия занята, часто найдётся другая с таким же уровнем комфорта.',
      en: 'Seven identical studios work as one space. If one is taken, there’s often another with the same comfort.' },

    { s: '.adv__card--4 .adv__name', uk: 'Усі деталі продумані', ru: 'Все детали продуманы', en: 'Every detail considered' },
    { s: '.adv__card--4 .adv__desc',
      uk: 'Ми постаралися передбачити всі дрібниці, щоб проживання було максимально комфортним з першого дня.',
      ru: 'Мы постарались предусмотреть все мелочи, чтобы проживание было максимально комфортным с первого дня.',
      en: 'We’ve tried to think of every little thing, so your stay is as comfortable as possible from day one.' },

    { s: '.adv__card--5 .adv__name', uk: 'Місце для двох', ru: 'Место для двоих', en: 'Room for two' },
    { s: '.adv__card--5 .adv__desc',
      uk: 'Студія розрахована на комфортне проживання однієї людини, а за потреби другий гість може розміститися на зручному дивані.',
      ru: 'Студия рассчитана на комфортное проживание одного человека, а при необходимости второй гость может разместиться на удобном диване.',
      en: 'The studio is designed for one person to stay comfortably, and a second guest can settle on the sofa if needed.' },

    // ---- Mission ----
    { s: '.mission-text',
      uk: 'Ми створили сервіс для людей, яким потрібне житло на кілька тижнів без агентств, заставних зустрічей та довгих переписок.',
      ru: 'Мы создали сервис для людей, которым нужно жильё на несколько недель без агентств, залоговых встреч и долгих переписок.',
      en: 'We built a service for people who need a place to stay for a few weeks — without agencies, deposit meetings or long chats.' },

    // ---- Steps ----
    { s: '.steps__title', uk: 'П’ять простих кроків для заселення', ru: 'Пять простых шагов для заселения', en: 'Five simple steps to check in' },
    { s: '.steps__col--1 .steps__label', uk: 'Перейдіть до Telegram-бота', ru: 'Перейдите в Telegram-бот', en: 'Open the Telegram bot' },
    { s: '.steps__col--2 .steps__label', uk: 'Виберіть дати',        ru: 'Выберите даты',      en: 'Pick your dates' },
    { s: '.steps__col--3 .steps__label', uk: 'Оплатіть',             ru: 'Оплатите',           en: 'Pay' },
    { s: '.steps__col--4 .steps__label', uk: 'Отримайте інструкцію', ru: 'Получите инструкцию', en: 'Get instructions' },
    { s: '.steps__col--5 .steps__label', uk: 'Заселіться самостійно', ru: 'Заселитесь самостоятельно', en: 'Check in yourself' },

    // ---- Icons: advantages ----
    { s: '.head--adv', uk: 'Переваги:', ru: 'Преимущества:', en: 'Benefits:' },
    { s: '.col-adv-a .lbl', uk: 'Самозаселення',       ru: 'Самозаселение',        en: 'Self check-in' },
    { s: '.col-adv-b .lbl', uk: 'Від 1 тижня',         ru: 'От 1 недели',          en: 'From 1 week' },
    { s: '.col-adv-c .lbl', uk: '7 однакових квартир', ru: '7 одинаковых квартир', en: '7 identical flats' },
    { s: '.col-adv-d .lbl', uk: 'Telegram-бронювання', ru: 'Telegram-бронирование', en: 'Telegram booking' },

    // ---- Icons: equipment ----
    { s: '.head--eq', uk: 'Оснащення:', ru: 'Оснащение:', en: 'Amenities:' },
    { s: '.col-eq-a .lbl', uk: 'Кондиціонер', ru: 'Кондиционер',  en: 'Air conditioner' },
    { s: '.col-eq-b .lbl', uk: 'Холодильник', ru: 'Холодильник',  en: 'Refrigerator' },
    { s: '.col-eq-c .lbl', uk: 'Пральна',     ru: 'Стиральная',   en: 'Washer' },

    // ---- Maps ----
    { s: '.maps__title', uk: 'Розташування', ru: 'Расположение', en: 'Location' },
    { s: '.maps__btn',   uk: 'Відкрити у Google Maps', ru: 'Открыть в Google Maps', en: 'Open in Google Maps' },

    // ---- Rules ----
    { s: '.rules__title', uk: 'Правила проживання', ru: 'Правила проживания', en: 'House rules' },
    { s: '.rules__subtitle', uk: 'Коротко, прозоро, без сюрпризів', ru: 'Кратко, прозрачно, без сюрпризов', en: 'Short, clear, no surprises' },
    { s: '.rules__p[data-rule="1"]', uk: 'Тиша з 22:00 до 08:00.', ru: 'Тишина с 22:00 до 08:00.', en: 'Quiet hours 22:00–08:00.' },
    { s: '.rules__p[data-rule="2"]', uk: 'Заборонено палити в приміщенні.', ru: 'Курить в помещении запрещено.', en: 'No smoking indoors.' },
    { s: '.rules__p[data-rule="3"]', uk: 'З тваринами — за окремою домовленістю.', ru: 'С животными — по отдельной договорённости.', en: 'Pets by separate arrangement.' },
    { s: '.rules__p[data-rule="4"]', h: true,
      uk: 'Заїзд після 14:00, виїзд до 12:00.<br>Раннє/пізнє — на запит.',
      ru: 'Заезд после 14:00, выезд до 12:00.<br>Ранний/поздний — по запросу.',
      en: 'Check-in after 14:00, check-out by 12:00.<br>Early/late — on request.' },
    { s: '.rules__p[data-rule="5"]', uk: 'Перед виїздом — фото показників лічильника надсилається в бот.', ru: 'Перед выездом — фото показаний счётчика отправляется в бот.', en: 'Before leaving, send a meter photo to the bot.' },
    { s: '.rules__in-label',  uk: 'Заїзд —', ru: 'Заезд —', en: 'Check-in —' },
    { s: '.rules__in-line', h: true,
      uk: 'після <span class="em-32">14:00</span>', ru: 'после <span class="em-32">14:00</span>', en: 'after <span class="em-32">14:00</span>' },
    { s: '.rules__out-label', uk: 'Виїзд —', ru: 'Выезд —', en: 'Check-out —' },
    { s: '.rules__out-line', h: true,
      uk: 'до <span class="em-32">12:00</span>', ru: 'до <span class="em-32">12:00</span>', en: 'by <span class="em-32">12:00</span>' },

    // ---- Booking ----
    { s: '.booking__title', uk: 'Бронювання житла', ru: 'Бронирование жилья', en: 'Book your stay' },
    { s: '.booking__lead',  uk: 'Бронюйте в пару дотиків', ru: 'Бронируйте в пару касаний', en: 'Book in a couple of taps' },
    { s: '.booking__desc',
      uk: 'Вибір дат, оплата та підтвердження — усередині Telegram-бота. Заїзд після 14:00, виїзд до 12:00.',
      ru: 'Выбор дат, оплата и подтверждение — внутри Telegram-бота. Заезд после 14:00, выезд до 12:00.',
      en: 'Choose dates, pay and confirm — all inside the Telegram bot. Check-in after 14:00, check-out by 12:00.' },
    { s: '.booking__btn-label', uk: 'Перейти в Telegram', ru: 'Перейти в Telegram', en: 'Go to Telegram' },

    // ---- Footer ----
    { s: '.footer__contacts', h: true,
      uk: '<div class="em-bold footer__heading">Контакти</div><div class="footer__lines">+380 (63) 796 82 42<br>hello@kvartal.example<br>Телеграм @boris8242</div>',
      ru: '<div class="em-bold footer__heading">Контакты</div><div class="footer__lines">+380 (63) 796 82 42<br>hello@kvartal.example<br>Телеграм @boris8242</div>',
      en: '<div class="em-bold footer__heading">Contacts</div><div class="footer__lines">+380 (63) 796 82 42<br>hello@kvartal.example<br>Telegram @boris8242</div>' },
    { s: '.footer__docs', h: true,
      uk: '<div class="em-bold footer__heading">Документи</div><div class="footer__doc-lines"><a href="oferta.html">Договір оферти</a><br><a href="#">Політика конфіденційності</a></div>',
      ru: '<div class="em-bold footer__heading">Документы</div><div class="footer__doc-lines"><a href="oferta.html">Договор оферты</a><br><a href="#">Политика конфиденциальности</a></div>',
      en: '<div class="em-bold footer__heading">Documents</div><div class="footer__doc-lines"><a href="oferta.html">Offer agreement</a><br><a href="#">Privacy policy</a></div>' }
  ];

  var TITLES = {
    uk: 'smartstudios — Мережа квартир одного стандарту, Могилів',
    ru: 'smartstudios — Сеть квартир одного стандарта, Могилёв',
    en: 'smartstudios — A network of identical flats, Mogilev'
  };

  function apply(lang) {
    if (!TITLES[lang]) lang = 'uk';
    ENTRIES.forEach(function (e) {
      var val = e[lang];
      if (val == null) return;
      document.querySelectorAll(e.s).forEach(function (el) {
        if (e.h) el.innerHTML = val; else el.textContent = val;
      });
    });
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('lang', lang); } catch (e2) {}
    // Let other modules (e.g. gallery.js) re-render language-dependent state.
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function init() {
    var saved = 'uk';
    try { saved = localStorage.getItem('lang') || 'uk'; } catch (e) {}
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
    });
    apply(saved);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
