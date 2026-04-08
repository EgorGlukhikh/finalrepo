import { notFound } from 'next/navigation';

import { Section, Stack } from '@/components/layout';
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
  const course = await getCourseStructureById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <CourseBuilderWorkspace
          course={course}
          selectedLessonId={lessonId ?? null}
          createModuleAction={createModuleAction}
          createLessonDraftAction={createLessonDraftAction}
          updateLessonAction={updateLessonAction}
          setLessonStatusAction={setLessonStatusAction}
          deleteLessonAction={deleteLessonAction}
        />
      </Stack>
    </Section>
  );
}
