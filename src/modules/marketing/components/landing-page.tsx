import { CourseCard } from '@/components/branding';
import { ActionLink, Grid, Section, SectionHeader, Stack } from '@/components/layout';
import { Badge, Card } from '@/components/ui';
import type { CourseListItem } from '@/modules/courses';
import { buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';

import { marketingBenefits, marketingFaq, marketingSteps, marketingTrustPoints } from '../content';

type LandingPageProps = {
  courses: CourseListItem[];
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

function accessLabel(accessType: string) {
  switch (accessType) {
    case 'FREE':
      return 'Бесплатный';
    case 'PAID':
      return 'Платный';
    case 'PRIVATE':
      return 'Закрытый';
    default:
      return accessType;
  }
}

function priceLabel(course: CourseListItem) {
  if (course.accessType === 'FREE' || course.priceAmount === null) {
    return 'Без оплаты';
  }

  return `${course.priceAmount} ₽`;
}

export function LandingPage({ courses, primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingPageProps) {
  const previewCourses = courses.slice(0, 3);

  return (
    <>
      <Section padding="lg">
        <Stack gap="xl" className="max-w-5xl">
          <div className="space-y-6">
            <Badge tone="outline">Образовательная платформа для риэлторов</Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-none tracking-[-0.04em] text-foreground">
                Спокойный и понятный способ учиться профессии риэлтора.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Академия риэлторов объединяет курсы, личный кабинет, прогресс и оплату в одном рабочем контуре. Здесь можно
                выбрать программу, учиться по шагам и возвращаться к материалам без лишнего шума.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink href={primaryCtaHref}>{primaryCtaLabel}</ActionLink>
              <ActionLink href={secondaryCtaHref} variant="secondary">
                Посмотреть курсы
              </ActionLink>
            </div>
          </div>

          <Grid cols={3} gap="lg" className="xl:grid-cols-3">
            <Card padding="lg">
              <Stack gap="sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Что это</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  Платформа для обучения риэлторов: каталог, уроки, прогресс, доступ и рабочий личный кабинет.
                </p>
              </Stack>
            </Card>
            <Card padding="lg">
              <Stack gap="sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Зачем</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  Чтобы учиться по структурированным программам и не терять контекст между курсом, уроком и практикой.
                </p>
              </Stack>
            </Card>
            <Card padding="lg">
              <Stack gap="sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Как начать</p>
                <p className="text-sm leading-7 text-muted-foreground">
                  Зарегистрируйтесь, откройте каталог и начните с бесплатного курса или выберите платную программу.
                </p>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Что это"
            title="Платформа, где обучение остается рабочим процессом"
            description="Академия риэлторов создана для тех, кому нужен не “инфопродукт”, а понятная образовательная среда: курс, структура, маршрут и прогресс в одном месте."
          />
          <Grid cols={2} gap="lg" className="xl:grid-cols-2">
            <Card padding="lg">
              <p className="text-sm leading-7 text-muted-foreground">
                Внутри платформы уже есть каталог курсов, learner flow, builder для материалов, админка и прозрачная логика доступа к
                бесплатным и платным программам.
              </p>
            </Card>
            <Card padding="lg">
              <p className="text-sm leading-7 text-muted-foreground">
                Поэтому пользователь быстро понимает, где выбрать курс, как начать обучение и как вернуться к нему позже без
                лишней навигации.
              </p>
            </Card>
          </Grid>
        </Stack>
      </Section>

      <Section>
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Преимущества"
            title="Все, что нужно для спокойного и последовательного обучения"
            description="Без перегруженных интерфейсов, без фальшивых обещаний и без попытки заменить практику красивыми словами."
          />
          <Grid cols={2} gap="lg" className="xl:grid-cols-2">
            {marketingBenefits.map((item) => (
              <Card key={item.title} padding="lg">
                <Stack gap="sm">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Как это работает"
            title="Четыре понятных шага от регистрации до применения в работе"
            description="Маршрут обучения остается коротким и прозрачным: без сложных сценариев и без потерянного контекста."
          />
          <Grid cols={4} gap="lg" className="xl:grid-cols-4">
            {marketingSteps.map((item) => (
              <Card key={item.step} padding="lg">
                <Stack gap="sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.step}</p>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section>
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Каталог"
            title="Курсы, которые можно открыть сразу"
            description="Витрина остается частью продукта: бесплатные курсы можно начать без оплаты, а платные программы обозначены честно и без сюрпризов."
            actions={
              <ActionLink href={buildCatalogPath()} variant="secondary">
                Открыть каталог
              </ActionLink>
            }
          />

          <Grid className="gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {previewCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.shortDescription ?? 'Подробное описание доступно на странице курса.'}
                status={accessLabel(course.accessType)}
                meta={[`${course.modulesCount} модулей`, `${course.lessonsCount} уроков`]}
                footer={
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">{priceLabel(course)}</span>
                    <ActionLink href={buildPublicCoursePath(course.slug)} variant="secondary">
                      Открыть курс
                    </ActionLink>
                  </div>
                }
              />
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Доверие"
            title="Платформа говорит фактами, а не обещаниями"
            description="Здесь нет фальшивых цифр и искусственных отзывов. Только рабочая логика продукта и понятный путь для пользователя."
          />
          <Grid cols={3} gap="lg" className="xl:grid-cols-3">
            {marketingTrustPoints.map((item) => (
              <Card key={item} padding="lg">
                <p className="text-sm leading-7 text-muted-foreground">{item}</p>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section>
        <Stack gap="lg">
          <SectionHeader
            eyebrow="FAQ"
            title="Коротко о самом важном"
            description="Только те вопросы, которые помогают начать без лишних сомнений."
          />
          <Grid cols={3} gap="lg" className="xl:grid-cols-3">
            {marketingFaq.map((item) => (
              <Card key={item.question} padding="lg">
                <Stack gap="sm">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{item.question}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section tone="muted">
        <Stack gap="lg" align="start" className="max-w-3xl">
          <SectionHeader
            eyebrow="Начать"
            title="Выберите курс и войдите в свой рабочий маршрут"
            description="Дальше все просто: откройте каталог, зарегистрируйтесь и начните обучение в том темпе, который подходит вам."
          />
          <div className="flex flex-wrap items-center gap-3">
            <ActionLink href={primaryCtaHref}>{primaryCtaLabel}</ActionLink>
            <ActionLink href={buildCatalogPath()} variant="secondary">
              Перейти в каталог
            </ActionLink>
          </div>
        </Stack>
      </Section>
    </>
  );
}
