import { redirect, notFound } from 'next/navigation';

import { ProgressPill } from '@/components/branding';
import { HeaderBar, PageLayout } from '@/components/product';
import { requireUser } from '@/modules/auth/access';
import { buildPublicCoursePath } from '@/modules/courses/paths';
import { getCourseLearningTree, getLessonForUser } from '@/modules/learning';
import { LearningWorkspace } from '@/modules/learning/components';

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
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Урок"
        title={tree.course.title}
        description="Урок открыт внутри курса: слева структура, в центре материалы, внизу переход к следующему шагу."
        actions={<ProgressPill value={tree.progressPercent} />}
      />
      <LearningWorkspace view={lessonView} />
    </PageLayout>
  );
}
