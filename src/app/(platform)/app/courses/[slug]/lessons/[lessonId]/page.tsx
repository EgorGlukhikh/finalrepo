import { redirect, notFound } from 'next/navigation';

import { Section, SectionHeader, Stack } from '@/components/layout';
import { requireUser } from '@/modules/auth/access';
import { buildPublicCoursePath } from '@/modules/courses/paths';
import { getCourseLearningTree, getLessonForUser } from '@/modules/learning';
import { LearningWorkspace } from '@/modules/learning/components';
import { ProgressPill } from '@/components/branding';

type LessonPageProps = {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params;
  const session = await requireUser(`/app/courses/${slug}/lessons/${lessonId}`);

  const tree = await getCourseLearningTree({ slug }, session.user.id, { view: 'learner' });

  if (!tree) {
    notFound();
  }

  if (!tree.canAccess) {
    redirect(buildPublicCoursePath(slug));
  }

  const lessonView = await getLessonForUser(tree.course.id, lessonId, session.user.id);

  if (!lessonView) {
    redirect(`/app/courses/${slug}`);
  }

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Урок"
          title={tree.course.title}
          description="Отдельный маршрут урока сохраняет контекст курса, прогресс и навигацию между уроками."
          actions={<ProgressPill value={tree.progressPercent} />}
        />
        <LearningWorkspace view={lessonView} />
      </Stack>
    </Section>
  );
}
