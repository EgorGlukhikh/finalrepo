import Link from 'next/link';

import { Badge, Box, Container, Grid, Heading, HStack, Image, Link as ChakraLink, Text } from '@chakra-ui/react';

import { ArrowRightSmallIcon } from '@/components/branding';
import type { CourseListItem } from '@/modules/courses';
import { buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';

type LandingCoursePreviewSectionProps = {
  courses: CourseListItem[];
};

const fallbackCourseImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAmZ4UozuE53wpOY4KR4CP5STr6-BkoTdYInde8GmlCSKwrI39NDPOe7Y2GwWN6syXZQabF58fCXHz-JPXdTjbfa0yC61tNNNu9ajwRD-EM3aEGvyC2zj1VLwujAaSs8Yicn7_eeSQdkCyKOsH2qOCzGdetCWz9NOeiCv9NQaGK0L_XLWk5T_vVahXrr9AgKa82yrAH7IIlsfRM3vVPsF5tG-EL5qbizIbkkBwQyUqjGuYrz3trBPfkZRpz4Kgu9sE3VzGwXJalWplE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBjib0YjUZIOJE2g9mysFZfp6XYgG9V0LR-cDO4lSAK_W-fAWLnmVAPdBdp_bfxqbhcy4wW1XeZC-QcqI3RiYQ3ferhvNcULbkeAPjHgYW-bQvvn1P-DlTpxUEhSEYlA8SLwyp3XC5LbJWB0vtcsj6btA41X7-a2UiTBdQWuqRMJlqcp0XH3WJPXhrZdfDfTiEpfx3cYj7CkNJ--AT-WP7sD1OdZ-MneSuulfMgd3POtnwF2xxysw9Y4kU93nXCYejNMxYl8Nri8qVV',
];

function priceLabel(course: CourseListItem) {
  if (course.accessType === 'FREE' || course.priceAmount === null) {
    return 'Бесплатно';
  }

  return `${course.priceAmount.toLocaleString('ru-RU')} ₽`;
}

function chipLabel(lessonsCount: number, index: number) {
  if (index === 0) {
    return `${Math.max(lessonsCount, 12)} Часов`;
  }

  return 'Инкубатор';
}

export function LandingCoursePreviewSection({ courses }: LandingCoursePreviewSectionProps) {
  const previewCourses = (courses.length > 0 ? courses : []).slice(0, 2);

  const normalizedCourses = Array.from({ length: 2 }, (_, index) => previewCourses[index] ?? null);

  return (
    <Box as="section" id="programs" bg="bg.surfaceMuted" px={{ base: '6', md: '12' }} py={{ base: 20, md: 32 }}>
      <Container maxW="wide" px="0">
        <Box display="flex" justifyContent="space-between" alignItems={{ base: 'start', md: 'end' }} flexDirection={{ base: 'column', md: 'row' }} gap="6" mb="16">
          <Box>
            <Heading textStyle="sectionTitle" color="fg.default" mb="4">
              Актуальные программы
            </Heading>
            <Text textStyle="bodyMuted" color="fg.muted">
              Выберите старт вашей новой экспертизы.
            </Text>
          </Box>

          <ChakraLink
            asChild
            display={{ base: 'none', md: 'inline-flex' }}
            color="accent.primary"
            borderBottomWidth="1px"
            borderColor="accent.primary"
            pb="1"
            _hover={{ filter: 'brightness(1.12)', textDecoration: 'none' }}
          >
            <Link href={buildCatalogPath()}>
              <Text fontFamily="label" fontSize="xs" fontWeight="700" letterSpacing="0.16em" textTransform="uppercase">
                Все курсы
              </Text>
            </Link>
          </ChakraLink>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }} gap="8">
          {normalizedCourses.map((course, index) => {
            const href = course ? buildPublicCoursePath(course.slug) : buildCatalogPath();
            const title = course ? course.title : index === 0 ? 'Основы жилой недвижимости' : 'Юридическая чистота сделки';
            const description =
              course?.shortDescription ??
              (index === 0
                ? 'Фундаментальный курс по аналитике рынка, оценке ликвидности и психологии работы с покупателем в эконом и комфорт сегментах.'
                : 'Глубокое погружение в проверку объектов, работу с обременениями и минимизацию рисков для ваших клиентов.');

            return (
              <Box
                key={course?.id ?? `placeholder-${index}`}
                bg="bg.surface"
                p="1"
                borderWidth="1px"
                borderColor="rgba(59, 73, 76, 0.1)"
                transition="border-color 0.5s ease"
                _hover={{ borderColor: 'rgba(0, 229, 255, 0.3)' }}
                role="group"
              >
                <Box position="relative" aspectRatio="16 / 9" overflow="hidden">
                  <Image
                    src={fallbackCourseImages[index]}
                    alt={title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    filter="grayscale(1)"
                    transition="transform 0.7s ease, filter 0.7s ease"
                    _groupHover={{ transform: 'scale(1.05)', filter: 'grayscale(0)' }}
                  />
                  <Box
                    position="absolute"
                    top="4"
                    right="4"
                    bg="rgba(10, 14, 20, 0.8)"
                    backdropFilter="blur(10px)"
                    px="4"
                    py="2"
                  >
                    <Text fontFamily="label" fontSize="10px" fontWeight="700" letterSpacing="0.16em" textTransform="uppercase" color="fg.default">
                      {chipLabel(course?.lessonsCount ?? 12, index)}
                    </Text>
                  </Box>
                </Box>

                <Box px="8" py="8">
                  <Heading as="h3" textStyle="h4" color="fg.default" mb="4">
                    {title}
                  </Heading>
                  <Text textStyle="bodyMuted" color="fg.muted" mb="8" maxW="2xl">
                    {description}
                  </Text>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt="6"
                    borderTopWidth="1px"
                    borderColor="rgba(59, 73, 76, 0.1)"
                  >
                    <HStack gap="3">
                      {course?.accessType === 'FREE' ? (
                        <Badge variant="solid" bg="transparent" color="accent.primary" p="0">
                          {priceLabel(course)}
                        </Badge>
                      ) : (
                        <Text color="fg.default" fontFamily="heading" fontSize="xl" fontWeight="700">
                          {course ? priceLabel(course) : '14 900 ₽'}
                        </Text>
                      )}
                    </HStack>

                    <ChakraLink asChild color="fg.muted" _hover={{ color: 'accent.primary' }}>
                      <Link href={href} aria-label={`Открыть курс ${title}`}>
                        <ArrowRightSmallIcon size={18} />
                      </Link>
                    </ChakraLink>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
