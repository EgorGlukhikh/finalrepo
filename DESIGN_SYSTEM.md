# Design System

## Принципы

- Семантические токены вместо разрозненных значений
- Единая шкала spacing
- Единый набор радиусов
- Единый ритм типографики
- Минимум motion
- Один акцентный brand color

## Что считается источником правды

- `src/styles/theme.css` — токены
- `src/styles/globals.css` — глобальная база
- `src/components/ui/*` — примитивы

## Правила использования

- Не добавлять случайные `p-[13px]`, `rounded-[17px]`, произвольные hex-цвета в JSX.
- Не создавать отдельный визуальный язык для одной страницы.
- Не дублировать существующие primitives ради локальной вариации.
- Если нужен новый компонент, он сначала оформляется как часть design system.

## Утвержденные группы компонентов

### Layout
- `Container`
- `Section`
- `Stack`
- `Inline`
- `Grid`
- `SectionHeader`

### UI
- `Button`
- `Input`
- `Textarea`
- `Label`
- `Select`
- `Card`
- `Badge`
- `Tabs`
- `Dialog`
- `EmptyState`
- `Skeleton`
- `Separator`
- `FormField`
- `StatusPill`

### LMS presentation
- `CourseCard`
- `StatCard`
- `ProgressPill`
- `LessonListItem`
- `InfoRow`
