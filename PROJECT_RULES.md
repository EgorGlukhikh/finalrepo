# Project Rules

## 1. Назначение правил

Этот документ нужен, чтобы новый разработчик быстро понял:
- как устроен проект;
- где лежит логика;
- какие решения уже зафиксированы;
- чего делать нельзя.

## 2. Архитектурные правила

- `src/app` — только маршруты, layouts, route boundaries и композиция страниц.
- `src/modules` — вся доменная логика, сервисы, actions, репозитории и queries.
- `src/components/ui` — только общие UI primitives.
- `src/components/layout` — shell, навигация и layout-обертки.
- `src/components/branding` — общие presentation-компоненты продукта.
- `src/lib` — инфраструктура и интеграции.
- `src/styles` — design tokens и глобальные стили.

## 3. Доменные правила

- Структура курса всегда иерархическая:
  - курс -> модуль -> урок
- Создание урока всегда идет через выбор `lessonType`.
- Бесплатный курс:
  - `accessType = FREE`
  - `priceAmount = null`
- Платный курс:
  - `accessType = PAID`
  - `priceAmount` обязателен
- Доступ к платному курсу дается только после подтвержденного платежа.
- `ResultURL` Robokassa — единственный authoritative callback.
- `SuccessURL` и `FailURL` не должны менять состояние заказа.

## 4. Правила доступа

- Проверки доступа должны быть централизованы.
- Нельзя размазывать auth/access логику по page files.
- Admin routes должны быть защищены на серверной границе.
- Learner flow живет в `src/modules/learning`.
- Billing logic живет в `src/modules/billing`.

## 5. Правила добавления новых фич

Перед добавлением новой фичи:
1. определить домен;
2. добавить или обновить module layer;
3. только потом подключать UI;
4. не тянуть Prisma-запросы в компоненты;
5. не дублировать бизнес-логику в routes.

Если фича новая, ориентир по структуре такой:
- типы и контракты — `types.ts`
- валидация — `schemas.ts`
- read-side — `queries.ts`
- write-side — `repository.ts`
- orchestration — `service.ts`
- server actions — `actions.ts` при необходимости

## 6. Запреты

Нельзя:
- делать монолитные страницы;
- писать inline styles;
- придумывать новые цвета, радиусы и spacing вне design system;
- класть DB logic в UI;
- класть payment logic в page files;
- обходить service layer прямыми вызовами Prisma из `src/app`.

## 7. Design system

- Все визуальные решения идут через токены.
- Любой новый экран должен собираться из существующих primitives.
- Если примитива не хватает, он сначала появляется в design system, а не прямо в конкретной странице.

Смотри:
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [COMPONENT_RULES.md](./COMPONENT_RULES.md)

## 8. Качество и проверки

Перед завершением задачи должно проходить:

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

## 9. Деплой и среда

- Railway использует `railway.toml`
- прод-миграции идут через `pnpm prisma migrate deploy`
- readiness endpoint — `/api/health`
- runtime secrets приходят через environment variables

Подробности:
- [ENVIRONMENT.md](./ENVIRONMENT.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
