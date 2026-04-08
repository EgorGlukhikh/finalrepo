import { notFound } from 'next/navigation';

import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
import { Button } from '@/components/ui';
import { getCourseStructureById } from '@/modules/courses';
import { createLessonAction, createModuleAction, deleteCourseAction, duplicateCourseAction, setCourseStatusAction } from '@/modules/courses/actions';
import { CourseBuilderWorkspace } from '@/modules/courses/components';

type AdminCoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function AdminCoursePage({ params }: AdminCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseStructureById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <Section padding="lg">
      <Stack gap="lg">
        <SectionHeader
          eyebrow="Админка"
          title={course.title}
          description="Конструктор остается рабочей средой курса: структура слева, действия и контекст справа."
          actions={
            <div className="flex flex-wrap gap-2">
              <ActionLink href="/admin/courses" variant="outline">
                К списку
              </ActionLink>
              <form action={setCourseStatusAction}>
                <input type="hidden" name="courseId" value={course.id} />
                <input type="hidden" name="status" value={course.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'} />
                <input type="hidden" name="returnPath" value={`/admin/courses/${course.id}`} />
                <Button type="submit" size="sm" variant="ghost">
                  {course.status === 'PUBLISHED' ? 'Снять с публикации' : 'Опубликовать'}
                </Button>
              </form>
              <form action={duplicateCourseAction}>
                <input type="hidden" name="courseId" value={course.id} />
                <Button type="submit" size="sm" variant="ghost">
                  Дублировать
                </Button>
              </form>
              <form action={deleteCourseAction}>
                <input type="hidden" name="courseId" value={course.id} />
                <input type="hidden" name="returnPath" value="/admin/courses" />
                <Button type="submit" size="sm" variant="danger">
                  Удалить
                </Button>
              </form>
            </div>
          }
        />

        <CourseBuilderWorkspace course={course} createModuleAction={createModuleAction} createLessonAction={createLessonAction} />
      </Stack>
    </Section>
  );
}
