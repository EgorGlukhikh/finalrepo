# CONTRIBUTING

## Как работать с проектом

1. Заберите актуальный `main`
2. Создайте feature branch
3. Работайте внутри уже существующей архитектуры
4. Проверьте изменения локально
5. Откройте PR с понятным описанием

## Ветки

- `main` — стабильная ветка
- рабочие ветки:
  - `feature/<scope>-<short-name>`
  - `fix/<scope>-<short-name>`
  - `chore/<scope>-<short-name>`

Примеры:
- `feature/learning-course-navigation`
- `fix/billing-result-callback`
- `chore/docs-readme-refresh`

## Коммиты

Используем conventional commits:

```text
<type>(scope): short description
```

Примеры:
- `feat(learning): add lesson navigation flow`
- `fix(billing): harden robokassa callback handling`
- `docs(repo): add deployment guides`
- `chore(github): update issue templates`

Запрещено:
- `update`
- `fix stuff`
- `changes`

## Pull Request

PR должен отвечать на 4 вопроса:
- что сделано;
- зачем это сделано;
- как это проверить;
- какие риски или ограничения остались.

Перед PR обязательно:

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm typecheck
corepack pnpm build
```

## Стиль кода

- маленькие файлы и явные названия;
- без Prisma в page components;
- без бизнес-логики в UI;
- без ad-hoc стилей вне design system;
- без монолитных страниц;
- без дублирования логики между page files и modules.

## Как не ломать архитектуру

- новый функционал добавляется в `src/modules/<domain>`;
- `src/app` — только маршрутный слой;
- `src/components` — только presentation и shell;
- доступы, прогресс, биллинг и auth проверяются в module/service layer;
- если нужна новая сущность или поток, сначала проверь:
  - [PROJECT_RULES.md](./PROJECT_RULES.md)
  - [ARCHITECTURE.md](./ARCHITECTURE.md)
  - [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
