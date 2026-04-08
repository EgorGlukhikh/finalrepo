# Деплой

## Railway

Проект подготовлен к деплою через Railway.

Источник правды:
- [railway.toml](./railway.toml)

## Что происходит при деплое

### Build

```bash
pnpm install --frozen-lockfile && pnpm build
```

### Pre-deploy

```bash
pnpm prisma migrate deploy
```

### Start

```bash
pnpm start
```

## Healthcheck

- endpoint: `/api/health`
- readiness считается успешной, когда:
  - обязательные runtime env присутствуют
  - база данных отвечает

Если env не заполнены или база недоступна, endpoint вернет `503`.

## Порядок запуска в Railway

1. Создать web service
2. Подключить GitHub-репозиторий
3. Подключить PostgreSQL service
4. Вставить переменные окружения в RAW Editor
5. Убедиться, что `main` защищен и CI зеленый
6. Запустить deploy

## RAW Editor

Используйте значения из:
- [ENVIRONMENT.md](./ENVIRONMENT.md)

Для production домена:

```env
NEXTAUTH_URL=https://finalrepo-production.up.railway.app
```

## Что делать при ошибках

### Приложение не поднимается
- проверить `DATABASE_URL`
- проверить `NEXTAUTH_SECRET`
- проверить `ROBOKASSA_*`
- проверить логи Railway

### Healthcheck падает
- открыть `/api/health`
- проверить missing env
- проверить доступность PostgreSQL

### Prisma migrate deploy падает
- проверить, что PostgreSQL service доступен
- проверить актуальность миграций
- проверить, что `DATABASE_URL` указывает на прод-базу

### Платежи не работают
- проверить `ROBOKASSA_MERCHANT_LOGIN`
- проверить `ROBOKASSA_PASSWORD_1`
- проверить `ROBOKASSA_PASSWORD_2`
- проверить корректность `ResultURL`
