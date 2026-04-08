# Page Blueprints

## Главное правило

Страница — это тонкий route adapter, а не место для доменной логики.

## Что можно делать в page files

- получить `params`
- вызвать module/service layer
- собрать страницу из layout и UI компонентов
- задать route boundary

## Что нельзя делать в page files

- писать Prisma queries
- держать payment logic
- дублировать auth/access checks без причины
- превращать страницу в giant form или business blob

## Текущие продуктовые поверхности

### Public
- `/`
- `/courses`
- `/courses/[slug]`
- `/design-system`

### Auth
- `/sign-in`
- `/sign-up`
- `/forgot-password`

### Platform
- `/app`
- `/app/courses/[slug]`
- `/app/courses/[slug]/lessons/[lessonId]`

### Admin
- `/admin`
- `/admin/courses`
- `/admin/courses/[courseId]`
- `/admin/users`
- `/admin/users/[userId]`
- `/admin/enrollments`
- `/admin/orders`
- `/admin/orders/[orderId]`

## Принципы для новых экранов

- Learner UI должен отличаться от builder/admin UI.
- Builder должен оставаться структурным и контекстным.
- Admin должен оставаться операционным и низкошумным.
- Public pages не должны превращаться в маркетинговый шум.
