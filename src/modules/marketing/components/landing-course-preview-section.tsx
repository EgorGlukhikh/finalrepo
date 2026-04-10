import { Badge, Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

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
          title="Выберите программу, с которой удобно начать прямо сейчас"
          description="Бесплатные курсы открываются сразу. На платных заранее видно программу, стоимость и что откроется после покупки."
          actions={
            <ButtonLink href={buildCatalogPath()} variant="outline" borderColor="border.strong">
              Открыть каталог
            </ButtonLink>
          }
        />

        {featuredCourse ? (
          <Grid gap="6" templateColumns={{ base: '1fr', xl: 'minmax(0,1.15fr) minmax(0,0.85fr)' }}>
            <GridItem>
              <SurfacePanel tone="highlight" p={{ base: 6, md: 7 }}>
                <Stack gap="5">
                  <HStack gap="3" flexWrap="wrap">
                    <Badge colorPalette={featuredCourse.accessType === 'FREE' ? 'green' : 'brand'} variant="subtle">
                      {accessLabel(featuredCourse.accessType)}
                    </Badge>
                    <Text textStyle="caption" color="fg.muted">
                      {priceLabel(featuredCourse)}
                    </Text>
                  </HStack>

                  <Stack gap="3" maxW="2xl">
                    <Heading textStyle="pageTitle" fontSize={{ base: '3xl', md: '4xl' }}>
                      {featuredCourse.title}
                    </Heading>
                    <Text textStyle="body" color="fg.muted" maxW="2xl">
                      {featuredCourse.shortDescription ??
                        'Откройте страницу курса, чтобы посмотреть программу, формат и условия доступа.'}
                    </Text>
                  </Stack>

                  <HStack gap="4" flexWrap="wrap" color="fg.muted">
                    <Text textStyle="bodyMuted">{featuredCourse.modulesCount} модулей</Text>
                    <Text textStyle="bodyMuted">{featuredCourse.lessonsCount} уроков</Text>
                  </HStack>

                  <HStack gap="3" flexWrap="wrap" pt="1">
                    <ButtonLink href={buildPublicCoursePath(featuredCourse.slug)} colorPalette="brand">
                      Посмотреть курс
                    </ButtonLink>
                    <ButtonLink href={buildCatalogPath()} variant="ghost">
                      Все программы
                    </ButtonLink>
                  </HStack>
                </Stack>
              </SurfacePanel>
            </GridItem>

            <GridItem>
              <SurfacePanel tone="muted" p={{ base: 5, md: 6 }}>
                <Stack gap="4">
                  {secondaryCourses.map((course) => (
                    <SurfacePanel key={course.id} tone="inset" p="4">
                      <Grid templateColumns={{ base: '1fr', md: 'minmax(0,1fr) auto' }} gap="4" alignItems="start">
                        <Stack gap="2">
                          <HStack gap="2" flexWrap="wrap">
                            <Badge colorPalette={course.accessType === 'FREE' ? 'green' : 'brand'} variant="subtle">
                              {accessLabel(course.accessType)}
                            </Badge>
                            <Text textStyle="caption" color="fg.muted">
                              {priceLabel(course)}
                            </Text>
                          </HStack>
                          <Heading as="h3" textStyle="h4">
                            {course.title}
                          </Heading>
                          <Text textStyle="bodyMuted" color="fg.muted">
                            {course.shortDescription ??
                              'На странице курса можно спокойно посмотреть программу и понять, подходит ли вам этот формат.'}
                          </Text>
                        </Stack>

                        <ButtonLink href={buildPublicCoursePath(course.slug)} variant="outline" borderColor="border.strong">
                          Подробнее
                        </ButtonLink>
                      </Grid>
                    </SurfacePanel>
                  ))}
                </Stack>
              </SurfacePanel>
            </GridItem>
          </Grid>
        ) : (
          <SurfacePanel tone="muted" p={{ base: 6, md: 7 }}>
            <Grid gap="6" templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) auto' }} alignItems="end">
              <Stack gap="3" maxW="2xl">
                <Text textStyle="overline" color="fg.subtle">
                  Каталог
                </Text>
                <Heading textStyle="sectionTitle">Опубликованные курсы появятся здесь.</Heading>
                <Text textStyle="bodyMuted" color="fg.muted">
                  Как только программа будет опубликована, она сразу появится в каталоге.
                </Text>
              </Stack>
              <ButtonLink href={buildCatalogPath()} variant="outline" borderColor="border.strong">
                Перейти в каталог
              </ButtonLink>
            </Grid>
          </SurfacePanel>
        )}
      </Stack>
    </PageSection>
  );
}
