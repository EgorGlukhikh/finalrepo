# DB Schema Notes

## Текущие сущности

- `User` — пользователь, роли, auth-основа
- `Course` — курс и его publish/access state
- `CourseModule` — упорядоченные модули
- `Lesson` — упорядоченные уроки с обязательным `lessonType`
- `Enrollment` — доступ к курсам
- `LessonProgress` — прогресс пользователя по урокам
- `Order` — заказ на платный курс
- `PaymentEvent` — события Robokassa и идемпотентность callback

## Моделирующие правила

- Иерархия фиксирована:
  - курс -> модуль -> урок
- Бесплатный курс:
  - `accessType = FREE`
  - `priceAmount = null`
- Платный курс:
  - `accessType = PAID`
  - `priceAmount` обязателен
- `lessonType` обязателен, потому что lesson creation flow тип-first
- progress и enrollment разделены намеренно:
  - enrollment = доступ
  - progress = прохождение

## Billing правила

- Order создается только для платного курса
- `ResultURL` проверяет подпись до любого изменения состояния
- callback должен быть идемпотентным
- success/fail redirect не считаются подтверждением оплаты

## Границы слоя данных

- Prisma access живет в module repositories
- read-side можно выносить в `queries.ts`
- pages не должны работать с Prisma напрямую
