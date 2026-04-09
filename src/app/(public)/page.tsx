import type { Metadata } from 'next';

import { getAuthSession } from '@/modules/auth/session';
import { listPublishedCourses } from '@/modules/courses';
import { buildCatalogPath } from '@/modules/courses/paths';
import { LandingPage } from '@/modules/marketing/components/landing-page';

export const metadata: Metadata = {
  title: 'Главная',
  description:
    'Академия риэлторов — курсы для риэлторов с личным кабинетом, прогрессом и доступом к бесплатным и платным программам.',
};

export default async function PublicHomePage() {
  const [session, courses] = await Promise.all([getAuthSession(), listPublishedCourses()]);

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
