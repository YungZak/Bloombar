# Bloombar Weddings — сайт-визитка

Одностраничный статический сайт: `index.html` + `styles.css` + `script.js`. Открывается двойным кликом по `index.html`, хостить можно где угодно (Netlify, Vercel, GitHub Pages).

Наполнение — по ТЗ (`BLOOMBAR WEDDINGS.pdf`): Full-Service Floral Design, À La Carte, Delivery & Setup, Our Story. Секция Floral Installations убрана по ТЗ.

## Что заменить перед запуском

- **Телефон**: `+1 (747) 366-0483` — актуальный (hero и секция `#contact`, ссылки `tel:+17473660483`).
- **Email**: `hello@bloombarweddings.com` — в hero, форме (`action`) и контактах.
- **Instagram**: `@bloombarweddings` / `https://instagram.com/bloombarweddings` — в hero и контактах.
- **Форма**: сейчас работает через `mailto:`. Для нормального приёма заявок подключите [Formspree](https://formspree.io) — замените `action` формы на их endpoint.

## Как заменить плейсхолдеры на реальные фото

1. Положите фотографии в папку `images/`.
2. Внутри блока-плейсхолдера `<div class="ph ...">` добавьте тег изображения:

```html
<div class="ph ph-tall">
  <img src="images/full-service.jpg" alt="Custom wedding floral design">
</div>
```

CSS растягивает `img` на весь блок (`object-fit: cover`). Фото нужны в трёх местах: hero (`.hero-media`), секция Full-Service и секция À La Carte — места помечены комментариями `<!-- Replace with... -->`.

## Логотип

- `images/logo-flower.png` — цветок без фона, используется в шапке.
- `images/bloombar-logo.png` — полный логотип без фона, используется в секции контактов.
- `images/logo.png` — квадратная версия на зелёном фоне; из неё сгенерированы фавиконки (`favicon-64.png`, `favicon-512.png`, `apple-touch-icon.png`).

## Портфолио

Фото категории лежат в `images/Full_service_wedding/`, превью для плитки — в подпапке `thumbs/` (ширина 640px). Список фото и категории задаются в `script.js` (массив `PHOTOS`).

Чтобы добавить новую категорию:
1. Создайте папку с фото и подпапку `thumbs/` с уменьшенными копиями (640px по ширине).
2. Добавьте файлы в массив `PHOTOS` в `script.js` с новым значением `cat`.
3. Добавьте кнопку `<button class="filter-btn" data-filter="...">` в блок `#portfolioFilter` в `index.html`.
