# Архитектура

## Слои приложения

### `src/app`
Маршрутный слой:
- layouts
- route groups
- page composition
- API routes

Здесь не должно быть:
- Prisma-запросов
- бизнес-логики домена
- платежной логики

### `src/modules`
Доменный слой:
- сервисы
- репозитории
- read models
- валидация
- actions

Это основной слой развития продукта.

### `src/components`
UI-слой:
- `ui/` — базовые примитивы
- `layout/` — shell и navigation
- `branding/` — переиспользуемые продуктовые presentation-компоненты

### `src/lib`
Инфраструктура:
- Prisma client
- env
- auth
- security helpers

## Ключевые домены

- `auth` — вход, регистрация, session boundaries
- `users` — работа с пользователями
- `courses` — курсы, модули, уроки, builder-facing контуры
- `enrollments` — доступ к курсам
- `progress` — прогресс по урокам
- `learning` — learner experience и navigation
- `billing` — orders, payment events, Robokassa
- `admin` — operational formatting и admin-facing helpers

## Как добавлять новую функциональность

1. Определите домен
2. Добавьте/обновите `types.ts`
3. Добавьте/обновите `schemas.ts`
4. Вынесите read-side в `queries.ts`
5. Вынесите write-side в `repository.ts`
6. Соберите сценарий в `service.ts`
7. Подключите UI через `src/app` и `src/components`

## Принцип

UI не должен знать, как устроены:
- платежи
- доступы
- прогресс
- Prisma relations

Эти знания живут в domain/service layer.
