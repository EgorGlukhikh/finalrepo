import { Grid, GridItem, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { ButtonLink, PageSection, SurfacePanel } from '@/components/compositions';
import { buildCatalogPath } from '@/modules/courses/paths';

type LandingCtaSectionProps = {
  primaryCtaHref: string;
  primaryCtaLabel: string;
};

export function LandingCtaSection({ primaryCtaHref, primaryCtaLabel }: LandingCtaSectionProps) {
  return (
    <PageSection>
      <SurfacePanel tone="highlight" maxW="6xl" mx="auto">
        <Grid gap="6" templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) auto' }} alignItems={{ base: 'start', lg: 'end' }}>
          <GridItem>
            <Stack gap="3" maxW="2xl">
              <Text textStyle="overline" color="fg.subtle">
                Начать
              </Text>
              <Heading textStyle="pageTitle" fontSize={{ base: '3xl', md: '4xl' }}>
                Выберите курс и войдите в свой рабочий маршрут обучения.
              </Heading>
              <Text textStyle="bodyMuted" color="fg.muted">
                Откройте каталог, зарегистрируйтесь и начните обучение в том темпе, который подходит вам: спокойно, по
                шагам и без лишней навигации.
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <HStack gap="3" flexWrap="wrap">
              <ButtonLink href={primaryCtaHref} colorPalette="brand" size="lg">
                {primaryCtaLabel}
              </ButtonLink>
              <ButtonLink href={buildCatalogPath()} variant="outline" size="lg" borderColor="border.strong">
                Перейти в каталог
              </ButtonLink>
            </HStack>
          </GridItem>
        </Grid>
      </SurfacePanel>
    </PageSection>
  );
}
