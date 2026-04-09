# Project Rules

## 1. Зачем нужен этот документ

Этот документ нужен, чтобы новый разработчик быстро понял:
- как устроен проект;
- где лежит логика;
- какие решения уже зафиксированы;
- что делать нельзя.

## 2. Архитектурные правила

- `src/app` — только маршруты, layouts, route boundaries и композиция страниц.
- `src/modules` — вся доменная логика, сервисы, actions, репозитории и queries.
- `src/components/ui` — только общие Chakra-backed primitives.
- `src/components/product` — продуктовые композиции поверх Chakra: page layout, panels, sidebars, action bars.
- `src/components/layout` — shell, навигация и route-aware оболочки.
- `src/components/branding` — presentation-компоненты продукта.
- `src/lib` — инфраструктура и интеграции.
- `src/styles` — только reset/global rules. Дизайн-токены живут в Chakra system.

## 3. Chakra UI contract

- Chakra — единственный UI engine проекта.
- `src/theme/system.ts` — единственный source of truth для токенов, semantic tokens и recipes.
- Нельзя использовать Chakra как просто styling helper. Он должен быть design-system engine.
- Нельзя строить экранный слой через случайные `Box` и `Stack`, если у блока есть явная продуктовая роль.
- Если Chakra уже даёт готовый паттерн, нельзя писать кастомную реализацию:
  - `Tabs`
  - `Dialog`
  - `Table`
  - `Accordion` / `Collapsible`
  - `Field`
  - `Menu`
  - `Badge`
  - `Alert`
- Любой low-level wrapper, который просто переименовывает `Box`, `Stack`, `Grid` или `Container`, считается лишним.

## 4. Product UI rules

- Все кнопки по умолчанию `size="md"`.
- `IconButton` по умолчанию тоже `size="md"`.
- Любое отклонение от `md` — редкое исключение, а не норма.
- Все формы собираются через `Field`.
- Все статусы показываются через `Badge`, а не через самописные pills.
- Все таблицы — через Chakra `Table`.
- Все confirm / selection flows — через Chakra `Dialog` и `Menu`.
- Split screens строятся через product-layer:
  - `PageLayout`
  - `SplitPageLayout`
  - `Sidebar`
  - `ContentArea`
  - `Panel`
  - `ActionBar`
- Builder всегда остаётся workspace-моделью:
  - слева структура;
  - справа редактор;
  - настройки не доминируют над контентом.

## 5. Доменные правила

- Структура курса всегда иерархическая:
  - курс -> модуль -> урок
- Создание урока всегда идёт через выбор `lessonType`.
- Бесплатный курс:
  - `accessType = FREE`
  - `priceAmount = null`
- Платный курс:
  - `accessType = PAID`
  - `priceAmount` обязателен
- Доступ к платному курсу даётся только после подтверждённого платежа.
- `ResultURL` Robokassa — единственный authoritative callback.
- `SuccessURL` и `FailURL` не должны менять состояние заказа.

## 6. Правила доступа

- Проверки доступа должны быть централизованы.
- Нельзя размазывать auth/access логику по page files.
- Admin routes должны быть защищены на серверной границе.
- Learner flow живёт в `src/modules/learning`.
- Billing logic живёт в `src/modules/billing`.

## 7. Как добавлять новые фичи

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

## 8. Запреты

Нельзя:
- делать монолитные страницы;
- писать inline styles;
- придумывать новые цвета, радиусы и spacing вне design system;
- класть DB logic в UI;
- класть payment logic в page files;
- обходить service layer прямыми вызовами Prisma из `src/app`;
- превращать экран в сетку одинаковых карточек без visual hierarchy;
- оставлять гибридный Tailwind/Chakra хаос в migrated-частях проекта.

## 9. Design system

- Все визуальные решения идут через Chakra tokens и semantic roles.
- Любой новый экран должен собираться из существующих primitives и product compositions.
- Если примитива не хватает, он сначала появляется в design system, а не прямо в конкретной странице.

Смотри:
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [COMPONENT_RULES.md](./COMPONENT_RULES.md)

## 10. Качество и проверки

Перед завершением задачи должно проходить:

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

## 11. Деплой и среда

- Railway использует `railway.toml`
- прод-миграции идут через `pnpm prisma migrate deploy`
- readiness endpoint — `/api/health`
- runtime secrets приходят через environment variables

Подробности:
- [ENVIRONMENT.md](./ENVIRONMENT.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
