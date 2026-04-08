# Академия риэлторов

Production-grade LMS-платформа для обучения специалистов рынка недвижимости.

## 1. Описание проекта

«Академия риэлторов» — это учебная платформа, в которой команда может:
- собирать курсы из модулей и уроков;
- публиковать бесплатные и платные программы;
- управлять доступом и обучением студентов;
- принимать оплату через Robokassa;
- сопровождать продукт через admin panel и Railway-деплой.

Проект рассчитан на:
- продуктовую команду, которая развивает LMS;
- frontend/backend-разработчиков, которым нужен понятный production-репозиторий;
- тех, кто хочет быстро поднять локальную среду и продолжить работу без перепридумывания архитектуры.

## 2. Основной функционал

- Конструктор курсов с иерархией `курс -> модуль -> урок`.
- Поддержка бесплатных и платных курсов.
- Публичный каталог и страница курса.
- Обучающий интерфейс для студента:
  - мои курсы;
  - прохождение уроков;
  - прогресс;
  - continue learning.
- Админ-панель:
  - курсы;
  - пользователи;
  - доступы;
  - заказы и платежные события.
- Интеграция Robokassa:
  - purchase intent;
  - `ResultURL`;
  - идемпотентная обработка callback.

## 3. Технологический стек

- Frontend: `Next.js App Router`, `React 19`, `TypeScript`
- UI: `Tailwind CSS v4`, собственный design system, `shadcn/ui`-style primitives
- Backend: route handlers и server actions внутри `Next.js`
- База данных: `PostgreSQL`
- ORM: `Prisma`
- Аутентификация: `NextAuth.js v4` с credentials flow и собственной БД
- Платежи: `Robokassa`
- Тесты: `Vitest` для практичных unit/service tests
- CI: `GitHub Actions`
- Деплой: `Railway`

## 4. Архитектура

### Слои

- `src/app` — только маршруты, layouts и композиция страниц.
- `src/modules` — доменная логика, сервисы, репозитории, server actions.
- `src/components/ui` — переиспользуемые UI primitives.
- `src/components/layout` — shell, навигация, layout wrappers.
- `src/components/branding` — продуктовые presentation-компоненты без доменной логики.
- `src/lib` — инфраструктура: env, auth, db, security.
- `src/styles` — токены и глобальная стилистика.

### Структура доменов

- `auth`
- `users`
- `courses`
- `enrollments`
- `progress`
- `learning`
- `billing`
- `admin`

Подробнее:
- [PROJECT_RULES.md](./PROJECT_RULES.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DB_SCHEMA_NOTES.md](./DB_SCHEMA_NOTES.md)

## 5. Быстрый старт локально

### Требования

- `Node.js 24+`
- `corepack`
- `PostgreSQL`

### Установка

```bash
corepack enable
corepack pnpm install
```

### Переменные окружения

1. Скопируйте `.env.example` в `.env`
2. Заполните обязательные значения

Список и описание переменных:
- [ENVIRONMENT.md](./ENVIRONMENT.md)

### Prisma

```bash
corepack pnpm db:generate
corepack pnpm prisma migrate deploy
```

Если вы поднимаете локальную dev-базу с нуля и хотите локальные dev-миграции:

```bash
corepack pnpm prisma migrate dev
```

### Запуск приложения

```bash
corepack pnpm dev
```

Проверки:

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

## 6. Запуск через Railway

Проект уже подготовлен к Railway:
- конфиг в [railway.toml](./railway.toml)
- прод-миграции через `pnpm prisma migrate deploy`
- healthcheck через `/api/health`

Базовый сценарий:
1. Создать Railway project
2. Подключить GitHub-репозиторий
3. Добавить PostgreSQL service
4. Вставить переменные окружения в RAW Editor
5. Запустить deploy

Подробная инструкция:
- [DEPLOYMENT.md](./DEPLOYMENT.md)

## 7. Основные сценарии продукта

### Пользователь

- заходит в каталог;
- открывает страницу курса;
- для бесплатного курса начинает обучение сразу;
- для платного курса идет в оплату;
- после зачисления проходит уроки и видит прогресс.

### Админ

- создает курс;
- открывает builder;
- добавляет модули и уроки;
- публикует курс;
- управляет доступами и смотрит заказы.

### Покупка курса

- платный курс создает order только при явном purchase intent;
- Robokassa подтверждает оплату через `ResultURL`;
- только после верифицированного callback выдается доступ.

## 8. Скриншоты

Можно добавить:
- публичный каталог;
- страницу курса;
- course builder;
- learner flow;
- admin panel.

## Дополнительная документация

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [PROJECT_RULES.md](./PROJECT_RULES.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ENVIRONMENT.md](./ENVIRONMENT.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- [COMPONENT_RULES.md](./COMPONENT_RULES.md)
- [PAGE_BLUEPRINTS.md](./PAGE_BLUEPRINTS.md)
- [DB_SCHEMA_NOTES.md](./DB_SCHEMA_NOTES.md)
