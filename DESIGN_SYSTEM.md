# Design System

## Принципы

- Chakra UI — единственный UI engine проекта.
- Визуальные решения идут из system theme, semantic tokens и product-layer, а не из локальных исключений.
- Интерфейс строится через роли: `bg.*`, `fg.*`, `border.*`, `accent.*`, `status.*`.
- Экран должен иметь иерархию, а не набор равновесных карточек.
- Builder, learner и admin используют один и тот же композиционный язык.

## Источник правды

- `src/theme/system.ts` — токены, semantic tokens, recipes, global CSS
- `src/theme/text-styles.ts` — типографическая иерархия
- `src/theme/layer-styles.ts` — surface hierarchy
- `src/theme/recipes.ts` — варианты компонентов
- `src/components/ui/*` — тонкие Chakra-backed primitives
- `src/components/product/*` — канонический product composition layer

## Базовые правила

- Не добавлять произвольные цвета, радиусы, тени и spacing вне theme.
- Не писать layout через случайные `Box` и `Stack`, если для этого уже есть product-layer.
- Все формы собираются через `Field` / `FormField`.
- Все кнопки по умолчанию `size="md"`.
- Для `Tabs`, `Dialog`, `Table`, `Accordion`, `Badge`, `Alert`, `Menu` использовать Chakra patterns, а не самописные аналоги.

## Канонические слои

### Theme
- `system.ts`
- `text-styles.ts`
- `layer-styles.ts`
- `recipes.ts`

### UI primitives
- `Button`
- `Input`
- `Textarea`
- `Select`
- `FormField`
- `Badge`
- `Tabs`
- `Dialog`
- `Table`
- `EmptyState`
- `Skeleton`
- `Separator`
- `StatusPill`

### Product compositions
- `PageLayout`
- `Panel`
- `HeaderBar`
- `ContentArea`
- `Sidebar`
- `ActionBar`
- `SettingsPanel`
- `DataPanel`
- `EntityListItem`
- `BuilderSidebar`
- `ContentCanvas`

### LMS presentation
- `CourseCard`
- `StatCard`
- `ProgressPill`
- `LessonListItem`
- `InfoRow`

## Запрещено

- Tailwind utility styling в экранном слое
- inline styles
- локальные “ещё одни tabs/dialog/table”
- одинаковые карточки без доминирующей зоны
- визуальные one-off решения вне system theme
