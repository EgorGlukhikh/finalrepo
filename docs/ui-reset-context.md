# UI Reset Context

Updated: 2026-04-09
Base commit: `50ac845`

## Why this document exists

This file captures the current UI reset context for future work in another branch.
The goal is to preserve the design intent behind the recent structural redesign so another agent does not reintroduce the same problems.

## Product state before the reset

The interface looked technically consistent but visually weak.
The main problems were structural:

- too many rounded containers
- too many equally weighted panels
- shell layout behaving like decorative framing instead of functional product structure
- admin and learner screens using nested split-layout logic
- public landing reading like a component showcase instead of a real product page
- sidebars stretching to the height of the full content column
- analytics blocks collapsing into narrow unreadable metric columns

This made the product feel:

- over-designed in the wrong places
- under-directed in the important places
- closer to a soft dashboard template than to a serious LMS/SaaS product

## Design direction after the reset

The current direction is:

- calmer
- flatter
- more editorial
- less “card soup”
- more typographic hierarchy
- fewer surfaces with stronger intent

The target feeling is:

- professional
- operational
- trustworthy
- structured

Not:

- playful
- decorative
- rounded-template SaaS

## Non-negotiable visual rules

- Do not bring back large-radius containers as the default layout language.
- Do not make every section a panel.
- Do not place multiple equal-weight blocks next to each other unless comparison is the point.
- Do not nest split layouts inside shells that already define a split layout.
- Use surface hierarchy sparingly: background first, typography second, panels third.
- Admin and learner shells should feel like workspaces, not like framed promo cards.
- Public pages must explain the product in 3 seconds, not demonstrate the component system.

## Structural fixes already completed

### 1. Shell reset

The header and route shells were simplified so the product no longer sits inside a decorative capsule.

Changed files:

- `src/components/layout/app-header.tsx`
- `src/components/layout/public-shell.tsx`
- `src/components/layout/public-nav.tsx`
- `src/components/layout/public-footer.tsx`
- `src/components/layout/platform-shell.tsx`
- `src/components/layout/admin-shell.tsx`

Key decisions:

- remove heavy shell framing
- make side navigation flatter and quieter
- keep branding visible but not ornamental
- let the content carry the hierarchy

### 2. Split layout fix

`SplitPageLayout` was corrected so the sidebar does not stretch to the full content height.

Changed file:

- `src/components/product/page-layout.tsx`

Key decisions:

- sidebar width reduced to a fixed operational column
- `alignItems="start"` added so sidebars stop turning into giant white tombstones

### 3. Surface tightening

The visual system was tightened to reduce softness and over-rounded behavior.

Changed files:

- `src/theme/system.ts`
- `src/theme/layer-styles.ts`
- `src/components/product/panel.tsx`
- `src/components/compositions/surface-panel.tsx`
- `src/components/branding/icon-chip.tsx`
- `src/components/branding/brand-mark.tsx`

Key decisions:

- quieter canvas and surface contrast
- fewer shadows
- smaller default radii
- less “pill UI” behavior

### 4. Landing rebuild

The landing page was rebuilt around a stronger narrative:

1. hero
2. what the user gets
3. product advantages
4. available programs
5. trust/FAQ
6. final CTA

Changed files:

- `src/modules/marketing/components/landing-hero.tsx`
- `src/modules/marketing/components/landing-benefits-section.tsx`
- `src/modules/marketing/components/landing-course-preview-section.tsx`
- `src/modules/marketing/components/landing-trust-section.tsx`
- `src/modules/marketing/components/landing-cta-section.tsx`

Key decisions:

- hero now has one dominant message and one supporting rail
- benefits are less card-based and more structured
- catalog preview has a featured block plus quieter supporting items
- trust section is flatter and more factual

### 5. Learner dashboard reset

The learner home was rebuilt so the shell owns the navigation and the page owns the learning hierarchy.

Changed file:

- `src/app/(platform)/app/page.tsx`

Key decisions:

- no nested split layout inside `PlatformShell`
- one dominant “continue/active course” focus
- secondary info should not compete with the next action

### 6. Admin home reset

The admin home was rebuilt so it behaves like an operational overview, not a card mosaic.

Changed files:

- `src/app/admin/page.tsx`
- `src/modules/analytics/components/admin-analytics-overview.tsx`

Key decisions:

- no nested split layout inside `AdminShell`
- top area should orient the operator quickly
- quick-access blocks should stay readable
- analytics should use wider, calmer metric presentation

## Files changed in commit `50ac845`

- `src/app/(platform)/app/page.tsx`
- `src/app/admin/page.tsx`
- `src/components/branding/brand-mark.tsx`
- `src/components/branding/icon-chip.tsx`
- `src/components/compositions/surface-panel.tsx`
- `src/components/layout/admin-shell.tsx`
- `src/components/layout/app-header.tsx`
- `src/components/layout/nav-link.tsx`
- `src/components/layout/platform-shell.tsx`
- `src/components/layout/public-footer.tsx`
- `src/components/layout/public-nav.tsx`
- `src/components/layout/public-shell.tsx`
- `src/components/product/page-layout.tsx`
- `src/components/product/panel.tsx`
- `src/modules/analytics/components/admin-analytics-overview.tsx`
- `src/modules/marketing/components/landing-benefits-section.tsx`
- `src/modules/marketing/components/landing-course-preview-section.tsx`
- `src/modules/marketing/components/landing-cta-section.tsx`
- `src/modules/marketing/components/landing-hero.tsx`
- `src/modules/marketing/components/landing-trust-section.tsx`
- `src/theme/layer-styles.ts`
- `src/theme/system.ts`

## Things another agent should not undo

- Do not restore elevated sidebar panels as the default shell pattern.
- Do not widen the split-layout sidebar again.
- Do not return to 4-up analytics columns inside constrained content widths.
- Do not bring back equal-sized card grids on the landing page.
- Do not reintroduce capsule-like nav framing around the main product shell.

## Most likely next high-value pass

If another agent continues the design work, the best next pass is:

1. inspect the live deployed pages after `50ac845`
2. tune spacing and typography on the landing with real screenshots
3. simplify auth actions in the top bar if they still feel too button-heavy
4. review learner detail pages and builder internals for leftover panel clutter
5. investigate the React hydration warning on production separately from visual work

## Validation status at the time of writing

These checks passed before the final commit:

- `corepack pnpm lint`
- `corepack pnpm typecheck`
- `corepack pnpm test`
- `corepack pnpm build`

Notes:

- `next build` mutates `tsconfig.json` by adding `.next/types/**/*.ts`; it was manually reverted before commit.
- Local production preview needs valid auth and database environment variables, otherwise public routes can throw runtime server errors unrelated to layout work.

## Important local context

- Do not touch `design logic.md`
- Keep page files thin and compositional
- Keep Chakra as the only UI engine
- Keep all buttons defaulting to `md`
