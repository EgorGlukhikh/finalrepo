# Railway Notes

## Deploy Contract
- Railway uses `railway.toml` as the source of truth.
- Build command installs dependencies with the lockfile and runs `pnpm build`.
- `preDeployCommand` must stay `pnpm prisma migrate deploy`.
- Start command stays `pnpm start`, which runs `next start`.
- Healthcheck uses `/api/health`.

## Readiness
- `/api/health` returns `200` only when:
  - required runtime environment variables are present
  - the database responds to a trivial query
- Missing runtime configuration or a broken database connection must return `503`.

## Runtime Env
- Canonical production URL:
  - `NEXTAUTH_URL=https://finalrepo-production.up.railway.app`
- Required at runtime:
  - `DATABASE_URL`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - `ROBOKASSA_MERCHANT_LOGIN`
  - `ROBOKASSA_PASSWORD_1`
  - `ROBOKASSA_PASSWORD_2`
- Optional with defaults:
  - `ROBOKASSA_PAYMENT_URL`
  - `ROBOKASSA_IS_TEST`

## Payment Notes
- `SuccessURL` and `FailURL` are redirects only.
- `ResultURL` is the authoritative payment callback.
- Repeated Robokassa callbacks must remain idempotent.
