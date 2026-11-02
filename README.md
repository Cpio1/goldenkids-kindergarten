# Golden Kids World — лендинг детского сада

Next.js 15 · TypeScript · Tailwind CSS 4. Статический сайт, готов к деплою на Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run typecheck && npm run lint
```

## Где что менять

| Что | Файл |
|---|---|
| Данные садика, телефон, адрес, часы, ссылки (Instagram, 2ГИС, карта, документы, WhatsApp), группы | `src/config/site.ts` |
| Все тексты на казахском и русском | `src/i18n/translations.ts` |
| Цвета, кнопки, формы рамок | `src/app/globals.css` |
| Интерфейс для компьютера (≥ 1080 px) | `src/components/website/` |
| Интерфейс для телефона (< 1080 px) | `src/components/mobile-website/` |
| Общие элементы (логотип, lightbox, кнопки, декор, подвал) | `src/components/shared/` |

Неподтверждённые поля в `site.ts` равны `null` / `false` и на сайте не показываются.
Заполните поле и пересоберите сайт — нужная кнопка или блок появятся сами:

- `documentsUrl` → кнопка «Құжаттарды қарау / Посмотреть документы»;
- `twoGisUrl` → кнопка «2ГИС-те ашу / Открыть в 2ГИС»;
- `mapEmbedUrl` → встроенная карта (только проверенный URL для iframe);
- `instagramUrl` → кнопка Instagram;
- `whatsapp.enabled = true` → кнопка WhatsApp в контактах и плавающая кнопка (https://wa.me/77471770666);
- `city`, `workingDays` → выводятся рядом с адресом и часами;
- `groups` → карточки групп с названиями и возрастом.

## Фотографии — `public/images/`

| Файл | Где показывается |
|---|---|
| `logo.png` (или .jpg/.jpeg/.webp) | шапка, первый экран, подвал |
| `main-page.*` | первый экран |
| `main-page2.*` | раздел «О садике» |
| `image1.*`, `image2.*`, `image3.*` … | галерея (по порядку номеров) |

Поддерживаются JPG, JPEG, PNG и WebP. Файлы читаются при сборке: после добавления фото
пересоберите / передеплойте сайт. Пока файлов нет, показываются аккуратные заглушки.

Для правильных ссылок в метаданных задайте на Vercel `NEXT_PUBLIC_SITE_URL` (например, `https://goldenkids.kz`).
