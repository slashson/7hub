# smartstudios — landing

Лендинг мережі квартир одного стандарту (короткострокова оренда, бронювання через Telegram). Точна реалізація дизайну з Figma (`PLAN-Mogilev`).

## Запуск
Статичний сайт — просто відкрий `index.html` у браузері або віддай будь-яким статичним хостингом (GitHub Pages тощо).

## Структура
- `index.html` — розмітка + підключення шрифтів + скрипт масштабування холста; містить плаваючу кнопку (`.fab`).
- `styles.css` — дизайн-токени, типографіка (`.ty-*`), холст 1024×3789, що масштабується під екран, іконка Telegram, sticky-кнопка.
- `sections.css` — стилі секцій (генерується з `build/`).
- `assets/img/`, `assets/icons/` — зображення та іконки.
- `assets/ref/reference.png` — еталонний експорт із Figma.

## Як редагувати
Кожна секція живе окремо в `build/<id>.{html,css}` (hero, main, mission, steps, icons, maps, rules, booking, footer). Після правок виконай:

```bash
python3 assemble.py
```

— це збере `sections.css` і вставить розмітку секцій у `index.html` між мітками `<!-- SECTIONS:START/END -->`. Довідник кольорів/шрифтів/координат — у `SPEC.md`.

Кнопки Telegram ведуть на `https://t.me/boris8242` (плейсхолдер).
