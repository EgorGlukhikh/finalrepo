import { Grid, GridItem, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { Panel } from '@/components/product';
import { getAdminDashboardAnalytics } from '@/modules/analytics';
import { AdminAnalyticsOverview } from '@/modules/analytics/components';

export default async function AdminHomePage() {
  const analytics = await getAdminDashboardAnalytics();

  return (
    <Stack gap="10">
      <Grid gap={{ base: '6', xl: '8' }} templateColumns={{ base: '1fr', xl: 'minmax(0,1.2fr) 20rem' }} alignItems="start">
        <GridItem>
          <Panel tone="highlight" p={{ base: '7', md: '8' }}>
            <Stack gap="6" maxW="3xl">
              <Text textStyle="overline" color="fg.subtle">
                РђРґРјРёРЅРєР°
              </Text>
              <Heading textStyle="pageTitle" maxW="3xl">
                РћРґРёРЅ СЂР°Р±РѕС‡РёР№ СЌРєСЂР°РЅ РґР»СЏ РєСѓСЂСЃРѕРІ, РґРѕСЃС‚СѓРїРѕРІ, РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ Рё Р·Р°РєР°Р·РѕРІ.
              </Heading>
              <Text textStyle="body" color="fg.muted" maxW="2xl">
                Р—РґРµСЃСЊ РІР°Р¶РЅРѕ РЅРµ РєРѕР»РёС‡РµСЃС‚РІРѕ Р±Р»РѕРєРѕРІ, Р° СЃРєРѕСЂРѕСЃС‚СЊ РѕСЂРёРµРЅС‚РёСЂРѕРІР°РЅРёСЏ. РЎРЅР°С‡Р°Р»Р° РєР»СЋС‡РµРІС‹Рµ СЃРёРіРЅР°Р»С‹ РїРѕ СЃРёСЃС‚РµРјРµ, Р·Р°С‚РµРј РєРѕСЂРѕС‚РєРёР№ РїСѓС‚СЊ РІ РЅСѓР¶РЅС‹Р№ РѕРїРµСЂР°С†РёРѕРЅРЅС‹Р№ СЂР°Р·РґРµР».
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" pt="2">
                <QuickAccessCard
                  href="/admin/courses"
                  title="РљСѓСЂСЃС‹"
                  value={analytics.business.totalCourses}
                  description="РџСѓР±Р»РёРєР°С†РёСЏ, workspace Рё СЃС‚СЂСѓРєС‚СѓСЂР° РїСЂРѕРіСЂР°РјРј."
                />
                <QuickAccessCard
                  href="/admin/users"
                  title="РџРѕР»СЊР·РѕРІР°С‚РµР»Рё"
                  value={analytics.business.totalUsers}
                  description="Р РѕР»Рё, РїСЂРѕС„РёР»Рё Рё СЂСѓС‡РЅРѕРµ СѓРїСЂР°РІР»РµРЅРёРµ РґРѕСЃС‚СѓРїРѕРј."
                />
                <QuickAccessCard
                  href="/admin/enrollments"
                  title="Р”РѕСЃС‚СѓРї"
                  value={analytics.business.totalEnrollments}
                  description="РђРєС‚РёРІРЅС‹Рµ Рё РѕС‚РѕР·РІР°РЅРЅС‹Рµ РґРѕСЃС‚СѓРїС‹ СЃ РїРѕРЅСЏС‚РЅС‹Рј РёСЃС‚РѕС‡РЅРёРєРѕРј."
                />
                <QuickAccessCard
                  href="/admin/orders"
                  title="Р—Р°РєР°Р·С‹"
                  value={analytics.business.totalPaidOrders}
                  description="РџР»Р°С‚РµР¶Рё, СЃС‚Р°С‚СѓСЃС‹ Рё СЃРІСЏР·Р°РЅРЅС‹Рµ РєСѓСЂСЃС‹."
                />
              </SimpleGrid>
            </Stack>
          </Panel>
        </GridItem>

        <GridItem>
          <Panel tone="muted" p="6">
            <Stack gap="4">
              <Text textStyle="overline" color="fg.subtle">
                Р¤РѕРєСѓСЃ РґРЅСЏ
              </Text>
              <Text textStyle="body" color="fg.default">
                Р•СЃР»Рё РЅСѓР¶РЅРѕ Р±С‹СЃС‚СЂРѕ РїРѕРЅСЏС‚СЊ РѕР±С‰РµРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РїР»Р°С‚С„РѕСЂРјС‹, РЅР°С‡РЅРёС‚Рµ СЃ Р°РЅР°Р»РёС‚РёРєРё РЅРёР¶Рµ. Р•СЃР»Рё РЅСѓР¶РЅРѕ РґРµР№СЃС‚РІРѕРІР°С‚СЊ, РѕС‚РєСЂС‹РІР°Р№С‚Рµ СЂР°Р·РґРµР» Рё СЂР°Р±РѕС‚Р°Р№С‚Рµ СѓР¶Рµ РІРЅСѓС‚СЂРё РЅРµРіРѕ.
              </Text>
            </Stack>
          </Panel>
        </GridItem>
      </Grid>

      <AdminAnalyticsOverview analytics={analytics} />
    </Stack>
  );
}

function QuickAccessCard({
  href,
  title,
  value,
  description,
}: {
  href: string;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <Panel tone="default" p="5">
      <Stack gap="4" h="full">
        <Stack gap="2">
          <Text textStyle="overline" color="fg.subtle">
            {title}
          </Text>
          <HStack align="end" gap="3">
            <Heading as="h2" textStyle="pageTitle" fontSize={{ base: '2xl', md: '3xl' }}>
              {value}
            </Heading>
          </HStack>
          <Text textStyle="bodyMuted" color="fg.muted" maxW="lg">
            {description}
          </Text>
        </Stack>

        <ActionLink href={href} variant="secondary" alignSelf="start" mt="auto">
          РћС‚РєСЂС‹С‚СЊ СЂР°Р·РґРµР»
        </ActionLink>
      </Stack>
    </Panel>
  );
}
