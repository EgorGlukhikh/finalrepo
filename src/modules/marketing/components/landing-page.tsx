import type { CourseListItem } from '@/modules/courses';

import { LandingBenefitsSection } from './landing-benefits-section';
import { LandingCoursePreviewSection } from './landing-course-preview-section';
import { LandingHero } from './landing-hero';
import { LandingJourneySection } from './landing-journey-section';
import { LandingTrustSection } from './landing-trust-section';

type LandingPageProps = {
  courses: CourseListItem[];
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
};

export function LandingPage({ courses, primaryCtaHref, primaryCtaLabel, secondaryCtaHref }: LandingPageProps) {
  return (
    <>
      <LandingHero
        primaryCtaHref={primaryCtaHref}
        primaryCtaLabel={primaryCtaLabel}
        secondaryCtaHref={secondaryCtaHref}
      />
      <LandingBenefitsSection />
      <LandingJourneySection />
      <LandingCoursePreviewSection courses={courses} />
      <LandingTrustSection />
    </>
  );
}
