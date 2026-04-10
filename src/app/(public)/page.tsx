import type { Metadata } from 'next';

import { getAuthSession } from '@/modules/auth/session';
import { listPublishedCourses } from '@/modules/courses';
import { buildCatalogPath } from '@/modules/courses/paths';
import { LandingPage } from '@/modules/marketing/components/landing-page';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Академия риэлторов: курсы, которые легко открыть, пройти по шагам и продолжить с того места, где вы остановились.',
};

export default async function PublicHomePage() {
  const [sessionResult, coursesResult] = await Promise.allSettled([getAuthSession(), listPublishedCourses()]);
  const session = sessionResult.status === 'fulfilled' ? sessionResult.value : null;
  const courses = coursesResult.status === 'fulfilled' ? coursesResult.value : [];

  const primaryCtaHref = session?.user ? '/app' : '/sign-up';
  const primaryCtaLabel = session?.user ? 'Продолжить обучение' : 'Начать обучение';

  return (
    <LandingPage
      courses={courses}
      primaryCtaHref={primaryCtaHref}
      primaryCtaLabel={primaryCtaLabel}
      secondaryCtaHref={buildCatalogPath()}
    />
  );
}
