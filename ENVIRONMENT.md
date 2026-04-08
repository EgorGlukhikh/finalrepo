# Переменные окружения

## Обязательные переменные

### `DATABASE_URL`
- Что это: строка подключения к PostgreSQL
- Где используется:
  - `prisma/schema.prisma`
  - `src/lib/db.ts`
  - runtime readiness через `/api/health`
- Пример:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/academy_realtors
```

### `NEXTAUTH_URL`
- Что это: канонический base URL приложения
- Где используется:
  - `src/lib/env.ts`
  - `NextAuth`
  - redirects и production auth context
- Пример:

```env
NEXTAUTH_URL=https://finalrepo-production.up.railway.app
```

### `NEXTAUTH_SECRET`
- Что это: секрет для NextAuth JWT/session crypto
- Где используется:
  - `src/lib/auth.ts`
- Пример:

```env
NEXTAUTH_SECRET=replace-with-long-random-secret
```

### `ROBOKASSA_MERCHANT_LOGIN`
- Что это: merchant login Robokassa
- Где используется:
  - `src/modules/billing/service.ts`
- Пример:

```env
ROBOKASSA_MERCHANT_LOGIN=merchant-login
```

### `ROBOKASSA_PASSWORD_1`
- Что это: пароль для формирования checkout signature
- Где используется:
  - `src/modules/billing/service.ts`
- Пример:

```env
ROBOKASSA_PASSWORD_1=replace-with-password-1
```

### `ROBOKASSA_PASSWORD_2`
- Что это: пароль для верификации `ResultURL`
- Где используется:
  - `src/modules/billing/service.ts`
- Пример:

```env
ROBOKASSA_PASSWORD_2=replace-with-password-2
```

## Необязательные переменные

### `ROBOKASSA_PAYMENT_URL`
- Что это: endpoint Robokassa checkout
- Где используется:
  - `src/modules/billing/service.ts`
- Значение по умолчанию:

```env
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.ru/Merchant/Index.aspx
```

### `ROBOKASSA_IS_TEST`
- Что это: флаг тестового режима Robokassa
- Где используется:
  - `src/modules/billing/service.ts`
- Допустимые значения:
  - `0`
  - `1`
- Пример:

```env
ROBOKASSA_IS_TEST=0
```

## Пример `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/academy_realtors
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-long-random-secret
ROBOKASSA_MERCHANT_LOGIN=merchant-login
ROBOKASSA_PASSWORD_1=replace-with-password-1
ROBOKASSA_PASSWORD_2=replace-with-password-2
ROBOKASSA_PAYMENT_URL=https://auth.robokassa.ru/Merchant/Index.aspx
ROBOKASSA_IS_TEST=1
```
