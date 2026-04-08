import { BookIcon, BookOpenIcon, EyeIcon, IconChip, SearchIcon, SettingsIcon } from '@/components/branding';
import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
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
  const featuredCourse = previewCourses[0] ?? null;
  const secondaryCourses = previewCourses.slice(1);

  return (
    <>
      <Section padding="lg">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_24rem] xl:items-start">
          <Stack gap="xl" className="max-w-4xl">
            <div className="space-y-6">
              <Badge tone="outline">Образовательная платформа для риэлторов</Badge>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-foreground">
                  Учебная среда, где курс, маршрут и доступ собраны в одном рабочем контуре.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Академия риэлторов помогает выбрать программу, проходить уроки по шагам и возвращаться к материалам без
                  хаоса, перегруженных панелей и отрыва от реальной практики.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ActionLink href={primaryCtaHref}>{primaryCtaLabel}</ActionLink>
                <ActionLink href={secondaryCtaHref} variant="secondary">
                  Посмотреть курсы
                </ActionLink>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
              <Card padding="lg" tone="highlight" className="min-h-64">
                <Stack gap="lg" className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                    <Badge tone="secondary">Что это</Badge>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-section font-semibold tracking-[-0.04em] text-foreground">
                      Платформа, где обучение ощущается как рабочий процесс, а не как витрина с карточками.
                    </h2>
                    <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                      Внутри уже работают каталог курсов, личный кабинет, обучение по модулям и урокам, прогресс, builder и
                      прозрачная логика бесплатного и платного доступа.
                    </p>
                  </div>
                  <div className="mt-auto grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-surface/82 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Каталог</div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Курсы с честной маркировкой: что открывается сразу, а что — после оплаты.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-surface/82 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Маршрут</div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Пользователь всегда видит, где он сейчас и что делать следующим шагом.
                      </p>
                    </div>
                  </div>
                </Stack>
              </Card>

              <Stack gap="md">
                <Card padding="lg" className="min-h-40">
                  <div className="flex items-start gap-4">
                    <IconChip icon={<SearchIcon size={17} />} tone="muted" />
                    <Stack gap="sm">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Зачем</div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        Чтобы учиться по структурированной программе и не терять контекст между выбором курса, уроком и
                        практикой.
                      </p>
                    </Stack>
                  </div>
                </Card>
                <Card padding="lg" tone="muted" className="min-h-40">
                  <div className="flex items-start gap-4">
                    <IconChip icon={<SettingsIcon size={17} />} tone="primary" />
                    <Stack gap="sm">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Как начать</div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        Зарегистрируйтесь, откройте каталог и начните с бесплатного курса или перейдите к платной программе.
                      </p>
                    </Stack>
                  </div>
                </Card>
              </Stack>
            </div>
          </Stack>

          <Stack gap="md">
            <Card padding="lg" className="min-h-52">
              <Stack gap="md">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Путь пользователя</div>
                  <Badge tone="outline">4 шага</Badge>
                </div>
                <div className="space-y-4">
                  {marketingSteps.map((item) => (
                    <div key={item.step} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                      <div className="flex h-9 items-center justify-center rounded-2xl bg-surface-muted text-sm font-semibold text-foreground ring-1 ring-border/70">
                        {item.step}
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="text-sm font-semibold tracking-[-0.03em] text-foreground">{item.title}</div>
                        <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Stack>
            </Card>
            <Card padding="lg" tone="muted">
              <div className="flex items-start gap-4">
                <IconChip icon={<EyeIcon size={17} />} tone="muted" />
                <Stack gap="sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Без шума</div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Здесь нет фальшивых цифр, декоративной аналитики и “волшебных обещаний”. Только рабочий маршрут обучения.
                  </p>
                </Stack>
              </div>
            </Card>
          </Stack>
        </div>
      </Section>

      <Section tone="muted">
        <Stack gap="xl">
          <SectionHeader
            eyebrow="Преимущества"
            title="Четыре опоры, на которых держится спокойный интерфейс обучения"
            description="Без перегруженных панелей, без фальшивого премиума и без ощущения, что продукт требует лишних действий от пользователя."
          />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Card padding="lg" tone="highlight" className="min-h-72">
              <Stack gap="md" className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <IconChip icon={<BookIcon size={18} />} tone="primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Система</span>
                </div>
                <h3 className="text-section font-semibold tracking-[-0.04em] text-foreground">
                  Интерфейс помогает двигаться по курсу, а не отвлекает второстепенными сущностями.
                </h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  Мы собрали каталог, личный кабинет, уроки, прогресс и доступ так, чтобы каждый следующий шаг читался сразу:
                  выбрать курс, открыть урок, продолжить обучение, вернуться позже.
                </p>
              </Stack>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {marketingBenefits.map((item) => (
              <Card key={item.title} padding="lg">
                <Stack gap="sm">
                  <h3 className="text-base font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </Stack>
              </Card>
            ))}
            </div>
          </div>
        </Stack>
      </Section>

      <Section>
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Каталог"
            title="Курсы, которые можно открыть сразу"
            description="Публичная витрина остается частью продукта: бесплатные курсы можно начать без оплаты, а платные программы обозначены честно и без сюрпризов."
            actions={
              <ActionLink href={buildCatalogPath()} variant="secondary">
                Открыть каталог
              </ActionLink>
            }
          />

          {featuredCourse ? (
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card padding="lg" tone="highlight" className="min-h-72">
                <Stack gap="sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <Badge tone={featuredCourse.accessType === 'FREE' ? 'success' : 'secondary'}>
                        {accessLabel(featuredCourse.accessType)}
                      </Badge>
                      <h3 className="text-page-title font-semibold tracking-[-0.05em] text-foreground">
                        {featuredCourse.title}
                      </h3>
                    </div>
                    <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    {featuredCourse.shortDescription ?? 'Курс можно открыть на отдельной странице и пройти по шагам в личном кабинете.'}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <Badge tone="outline">{featuredCourse.modulesCount} модулей</Badge>
                    <Badge tone="outline">{featuredCourse.lessonsCount} уроков</Badge>
                    <Badge tone="outline">{priceLabel(featuredCourse)}</Badge>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    <ActionLink href={buildPublicCoursePath(featuredCourse.slug)}>Открыть курс</ActionLink>
                    <ActionLink href={buildCatalogPath()} variant="secondary">
                      Смотреть все программы
                    </ActionLink>
                  </div>
                </Stack>
              </Card>

              <Stack gap="md">
                {secondaryCourses.map((course) => (
                  <Card key={course.id} padding="lg" tone="muted">
                    <Stack gap="md">
                      <div className="flex items-center justify-between gap-4">
                        <Badge tone={course.accessType === 'FREE' ? 'success' : 'secondary'}>{accessLabel(course.accessType)}</Badge>
                        <span className="text-sm text-muted-foreground">{priceLabel(course)}</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold tracking-[-0.03em] text-foreground">{course.title}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {course.shortDescription ?? 'Подробности курса доступны на отдельной странице.'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-sm text-muted-foreground">
                          {course.modulesCount} модулей · {course.lessonsCount} уроков
                        </span>
                        <ActionLink href={buildPublicCoursePath(course.slug)} variant="secondary">
                          Открыть
                        </ActionLink>
                      </div>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>
          ) : null}
        </Stack>
      </Section>

      <Section tone="muted">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <Stack gap="lg">
          <SectionHeader
            eyebrow="Доверие"
            title="Платформа говорит фактами, а не обещаниями"
            description="Здесь нет фальшивых цифр и искусственных отзывов. Только рабочая логика продукта и понятный путь для пользователя."
          />
            <div className="grid gap-4 md:grid-cols-3">
            {marketingTrustPoints.map((item) => (
              <Card key={item} padding="lg">
                <p className="text-sm leading-7 text-muted-foreground">{item}</p>
              </Card>
            ))}
            </div>
          </Stack>
          <Card padding="lg" className="h-fit">
            <Stack gap="md">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">FAQ</div>
            {marketingFaq.map((item) => (
                <div key={item.question} className="space-y-2 border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
                  <h3 className="text-base font-semibold tracking-[-0.03em] text-foreground">{item.question}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </div>
            ))}
            </Stack>
          </Card>
        </div>
      </Section>

      <Section>
        <Card padding="lg" tone="highlight" className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <Stack gap="sm" className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Начать</div>
              <h2 className="text-page-title font-semibold tracking-[-0.05em] text-foreground">
                Выберите курс и войдите в свой рабочий маршрут обучения.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                Откройте каталог, зарегистрируйтесь и начните обучение в том темпе, который подходит вам: спокойно, по шагам и
                без лишней навигации.
              </p>
            </Stack>
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink href={primaryCtaHref}>{primaryCtaLabel}</ActionLink>
              <ActionLink href={buildCatalogPath()} variant="secondary">
                Перейти в каталог
              </ActionLink>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
