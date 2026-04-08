import { redirect, notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader, Stack } from '@/components/layout';
import { requireUser } from '@/modules/auth/access';
import { buildPublicCoursePath } from '@/modules/courses/paths';
import { getCourseLearningTree, getLessonForUser } from '@/modules/learning';
import { LearningWorkspace } from '@/modules/learning/components';
import { ProgressPill } from '@/components/branding';

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
      <Section padding="lg">
        <Stack gap="lg">
          <SectionHeader
            eyebrow="Обучение"
            title={tree.course.title}
            description="В этом курсе пока нет опубликованных уроков."
            actions={<Badge tone="secondary">Пустой курс</Badge>}
          />
        </Stack>
      </Section>
    );
  }

  const lessonView = await getLessonForUser(tree.course.id, lessonId, session.user.id);

  if (!lessonView) {
    redirect(buildPublicCoursePath(slug));
  }

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Обучение"
          title={tree.course.title}
          description="Плеер собран для спокойного прохождения уроков без лишнего интерфейсного шума."
          actions={<ProgressPill value={tree.progressPercent} />}
        />
        <LearningWorkspace view={lessonView} />
      </Stack>
    </Section>
  );
}
