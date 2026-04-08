import { redirect } from 'next/navigation';

import { buildPublicCoursePath } from '@/modules/courses/paths';

type LegacyCoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyCoursePage({ params }: LegacyCoursePageProps) {
  const { slug } = await params;
  redirect(buildPublicCoursePath(slug));
}
