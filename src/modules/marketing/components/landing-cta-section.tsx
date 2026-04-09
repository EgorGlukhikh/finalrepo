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
      <SurfacePanel tone="highlight" maxW="6xl" mx="auto" p={{ base: 6, md: 7 }}>
        <Grid gap="6" templateColumns={{ base: '1fr', lg: 'minmax(0,1fr) auto' }} alignItems={{ base: 'start', lg: 'end' }}>
          <GridItem>
            <Stack gap="3" maxW="2xl">
              <Text textStyle="overline" color="fg.subtle">
                Начать
              </Text>
              <Heading textStyle="pageTitle" fontSize={{ base: '3xl', md: '4xl' }}>
                Выберите курс и начните обучение.
              </Heading>
              <Text textStyle="bodyMuted" color="fg.muted">
                Войдите в аккаунт, откройте каталог и переходите к нужной программе.
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <HStack gap="3" flexWrap="wrap">
              <ButtonLink href={primaryCtaHref} colorPalette="brand">
                {primaryCtaLabel}
              </ButtonLink>
              <ButtonLink href={buildCatalogPath()} variant="outline" borderColor="border.strong">
                Перейти в каталог
              </ButtonLink>
            </HStack>
          </GridItem>
        </Grid>
      </SurfacePanel>
    </PageSection>
  );
}
