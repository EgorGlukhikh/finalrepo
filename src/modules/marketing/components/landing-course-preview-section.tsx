import { Badge, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { BookOpenIcon, IconChip } from '@/components/branding';
import { ButtonLink, PageSection, SectionHeading, SurfacePanel } from '@/components/compositions';
import type { CourseListItem } from '@/modules/courses';
import { buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';

type LandingCoursePreviewSectionProps = {
  courses: CourseListItem[];
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

export function LandingCoursePreviewSection({ courses }: LandingCoursePreviewSectionProps) {
  const previewCourses = courses.slice(0, 3);
  const featuredCourse = previewCourses[0] ?? null;
  const secondaryCourses = previewCourses.slice(1);

  return (
    <PageSection>
      <Stack gap="8">
        <SectionHeading
          eyebrow="Каталог"
          title="Программы, которые можно открыть сейчас"
          description="Бесплатные курсы доступны сразу. Платные программы обозначены честно и открываются только после подтвержденной оплаты."
          actions={
            <ButtonLink href={buildCatalogPath()} variant="outline" borderColor="border.strong">
              Открыть каталог
            </ButtonLink>
          }
        />

        {featuredCourse ? (
          <Grid gap="4" templateColumns={{ base: '1fr', xl: 'minmax(0,1.1fr) minmax(0,0.9fr)' }}>
            <GridItem>
              <SurfacePanel tone="highlight" minH={{ base: 'auto', xl: '18rem' }}>
                <Stack gap="4" h="full">
                  <HStack justify="space-between" align="start">
                    <Stack gap="3" maxW="2xl">
                      <Badge colorPalette={featuredCourse.accessType === 'FREE' ? 'green' : 'brand'} variant="subtle">
                        {accessLabel(featuredCourse.accessType)}
                      </Badge>
                      <Heading textStyle="pageTitle" fontSize={{ base: '3xl', md: '4xl' }}>
                        {featuredCourse.title}
                      </Heading>
                    </Stack>
                    <IconChip icon={<BookOpenIcon size={18} />} tone="primary" />
                  </HStack>

                  <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                    {featuredCourse.shortDescription ??
                      'На странице курса пользователь видит программу, условия доступа и понятный путь к началу обучения.'}
                  </Text>

                  <HStack gap="2.5" flexWrap="wrap">
                    <MetaBadge label={`${featuredCourse.modulesCount} модулей`} />
                    <MetaBadge label={`${featuredCourse.lessonsCount} уроков`} />
                    <MetaBadge label={priceLabel(featuredCourse)} />
                  </HStack>

                  <HStack mt="auto" gap="3" flexWrap="wrap" pt="2">
                    <ButtonLink href={buildPublicCoursePath(featuredCourse.slug)} colorPalette="brand">
                      Открыть курс
                    </ButtonLink>
                    <ButtonLink href={buildCatalogPath()} variant="ghost">
                      Все программы
                    </ButtonLink>
                  </HStack>
                </Stack>
              </SurfacePanel>
            </GridItem>

            <GridItem>
              <Stack gap="4">
                {secondaryCourses.map((course) => (
                  <SurfacePanel key={course.id} tone="muted">
                    <Stack gap="4">
                      <HStack justify="space-between" align="start">
                        <Badge colorPalette={course.accessType === 'FREE' ? 'green' : 'brand'} variant="subtle">
                          {accessLabel(course.accessType)}
                        </Badge>
                        <Text fontSize="sm" color="fg.muted">
                          {priceLabel(course)}
                        </Text>
                      </HStack>

                      <Stack gap="2">
                        <Heading as="h3" fontSize="lg" lineHeight="1.25" letterSpacing="-0.03em">
                          {course.title}
                        </Heading>
                        <Text textStyle="bodyMuted" color="fg.muted">
                          {course.shortDescription ?? 'Курс открывается на отдельной странице с программой, доступом и следующим шагом.'}
                        </Text>
                      </Stack>

                      <HStack justify="space-between" align="center" gap="3" pt="1" flexWrap="wrap">
                        <Text fontSize="sm" color="fg.muted">
                          {course.modulesCount} модулей · {course.lessonsCount} уроков
                        </Text>
                        <ButtonLink href={buildPublicCoursePath(course.slug)} variant="outline" borderColor="border.strong">
                          Открыть
                        </ButtonLink>
                      </HStack>
                    </Stack>
                  </SurfacePanel>
                ))}
              </Stack>
            </GridItem>
          </Grid>
        ) : (
          <SurfacePanel tone="muted">
            <Stack gap="3">
              <Text textStyle="bodyStrong" color="fg.default">
                Каталог запускается поэтапно.
              </Text>
              <Text textStyle="bodyMuted" color="fg.muted" maxW="2xl">
                Первая подборка курсов появится здесь после публикации. Платформа уже готова к обучению: личный кабинет,
                доступ к курсам и прогресс работают как единая система.
              </Text>
            </Stack>
          </SurfacePanel>
        )}
      </Stack>
    </PageSection>
  );
}

function MetaBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" borderColor="border.strong">
      {label}
    </Badge>
  );
}
