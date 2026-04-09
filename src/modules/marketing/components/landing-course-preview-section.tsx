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
          title="Курсы, которые можно открыть сразу"
          description="Публичная витрина остается частью продукта: бесплатные курсы можно начать без оплаты, а платные программы обозначены честно и без сюрпризов."
          actions={
            <ButtonLink href={buildCatalogPath()} variant="outline" borderColor="border.strong">
              Открыть каталог
            </ButtonLink>
          }
        />

        {featuredCourse ? (
          <Grid gap="4" templateColumns={{ base: '1fr', xl: 'minmax(0,1.1fr) minmax(0,0.9fr)' }}>
            <GridItem>
              <SurfacePanel tone="highlight" minH={{ base: 'auto', xl: '20rem' }}>
                <Stack gap="4" h="full">
                  <HStack justify="space-between" align="start">
                    <Stack gap="3" maxW="2xl">
                      <Badge
                        alignSelf="flex-start"
                        borderRadius="full"
                        px="3"
                        py="1.5"
                        colorPalette={featuredCourse.accessType === 'FREE' ? 'green' : 'brand'}
                        variant="subtle"
                      >
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
                      'Курс можно открыть на отдельной странице и пройти по шагам в личном кабинете.'}
                  </Text>

                  <HStack gap="2.5" flexWrap="wrap">
                    <MetaBadge label={`${featuredCourse.modulesCount} модулей`} />
                    <MetaBadge label={`${featuredCourse.lessonsCount} уроков`} />
                    <MetaBadge label={priceLabel(featuredCourse)} />
                  </HStack>

                  <HStack mt="auto" gap="3" flexWrap="wrap" pt="4">
                    <ButtonLink href={buildPublicCoursePath(featuredCourse.slug)} colorPalette="brand">
                      Открыть курс
                    </ButtonLink>
                    <ButtonLink href={buildCatalogPath()} variant="ghost" color="fg.muted" _hover={{ bg: 'bg.inset', color: 'fg.default' }}>
                      Смотреть все программы
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
                        <Badge
                          borderRadius="full"
                          px="3"
                          py="1"
                          colorPalette={course.accessType === 'FREE' ? 'green' : 'brand'}
                          variant="subtle"
                        >
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
                          {course.shortDescription ?? 'Подробности курса доступны на отдельной странице.'}
                        </Text>
                      </Stack>
                      <HStack justify="space-between" align="center" gap="3" pt="1" flexWrap="wrap">
                        <Text fontSize="sm" color="fg.muted">
                          {course.modulesCount} модулей · {course.lessonsCount} уроков
                        </Text>
                        <ButtonLink href={buildPublicCoursePath(course.slug)} variant="outline" borderColor="border.strong" size="sm">
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
            <Text textStyle="bodyMuted" color="fg.muted">
              Каталог появится здесь, как только в системе будут опубликованы первые курсы.
            </Text>
          </SurfacePanel>
        )}
      </Stack>
    </PageSection>
  );
}

function MetaBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" borderRadius="full" px="3" py="1.5" borderColor="border.strong">
      {label}
    </Badge>
  );
}
