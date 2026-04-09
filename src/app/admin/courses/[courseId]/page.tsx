import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/product';
import { getCourseAnalytics } from '@/modules/analytics';
import { CourseAnalyticsStrip } from '@/modules/analytics/components';
import { getCourseStructureById } from '@/modules/courses';
import {
  createLessonDraftAction,
  createModuleAction,
  deleteLessonAction,
  setLessonStatusAction,
  updateLessonAction,
} from '@/modules/courses/actions';
import { CourseBuilderWorkspace } from '@/modules/courses/components';

type AdminCoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
  searchParams: Promise<{
    lessonId?: string;
  }>;
};

export default async function AdminCoursePage({ params, searchParams }: AdminCoursePageProps) {
  const { courseId } = await params;
  const { lessonId } = await searchParams;
  const [course, analytics] = await Promise.all([getCourseStructureById(courseId), getCourseAnalytics(courseId)]);

  if (!course) {
    notFound();
  }

  return (
    <PageLayout spacing="lg">
      <CourseAnalyticsStrip analytics={analytics} />
      <CourseBuilderWorkspace
        course={course}
        selectedLessonId={lessonId ?? null}
        createModuleAction={createModuleAction}
        createLessonDraftAction={createLessonDraftAction}
        updateLessonAction={updateLessonAction}
        setLessonStatusAction={setLessonStatusAction}
        deleteLessonAction={deleteLessonAction}
        lessonMetrics={analytics.lessonMetrics}
      />
    </PageLayout>
  );
}
