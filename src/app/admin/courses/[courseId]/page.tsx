import { notFound } from 'next/navigation';

import { Section, SectionHeader, Stack } from '@/components/layout';
import { getCourseStructureById } from '@/modules/courses';
import { updateCourseAction } from '@/modules/courses/actions';
import { CourseEditorForm } from '@/modules/courses/components';

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
          description="Редактирование курса с единым переключателем бесплатного доступа и цены."
        />

        <CourseEditorForm
          course={course}
          action={updateCourseAction}
          submitLabel="Сохранить курс"
          title="Параметры курса"
          description="Обновляйте основные данные курса. Бесплатный режим и цена остаются в одном простом потоке."
        />
      </Stack>
    </Section>
  );
}
