import { redirect, notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { ProgressPill } from '@/components/branding';
import { HeaderBar, PageLayout } from '@/components/product';
import { requireUser } from '@/modules/auth/access';
import { buildPublicCoursePath } from '@/modules/courses/paths';
import { getCourseLearningTree, getLessonForUser } from '@/modules/learning';
import { LearningWorkspace } from '@/modules/learning/components';

type CourseLearningPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseLearningPage({ params }: CourseLearningPageProps) {
  const { slug } = await params;
  const session = await requireUser(`/app/courses/${slug}`);

  const tree = await getCourseLearningTree({ slug }, session.user.id, { view: 'learner' });

  if (!tree) {
    notFound();
  }

  if (!tree.canAccess) {
    redirect(buildPublicCoursePath(slug));
  }

  const lessonId = tree.continueLesson?.id ?? tree.modules[0]?.lessons[0]?.id;

  if (!lessonId) {
    return (
      <PageLayout spacing="lg">
        <HeaderBar
          eyebrow="Обучение"
          title={tree.course.title}
          description="В этом курсе пока нет опубликованных уроков."
          actions={<Badge tone="secondary">Пустой курс</Badge>}
        />
      </PageLayout>
    );
  }

  const lessonView = await getLessonForUser(tree.course.id, lessonId, session.user.id);

  if (!lessonView) {
    redirect(buildPublicCoursePath(slug));
  }

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Обучение"
        title={tree.course.title}
        description="Откройте урок и продолжайте с того места, где остановились."
        actions={<ProgressPill value={tree.progressPercent} />}
      />
      <LearningWorkspace view={lessonView} />
    </PageLayout>
  );
}
