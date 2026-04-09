import { notFound } from 'next/navigation';

import { DataList, Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ContentArea, HeaderBar, PageLayout, SettingsPanel, SplitPageLayout } from '@/components/product';
import { formatAdminDate } from '@/modules/admin/format';
import { getCourseStructureById } from '@/modules/courses';
import { updateCourseSettingsAction } from '@/modules/courses/actions';
import { CourseSettingsForm } from '@/modules/courses/components';

type AdminCourseSettingsPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function AdminCourseSettingsPage({ params }: AdminCourseSettingsPageProps) {
  const { courseId } = await params;
  const course = await getCourseStructureById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Настройки курса"
        title={course.title}
        description="Builder отвечает только за структуру и контент уроков. Метаданные курса живут отдельно."
        actions={
          <ActionLink href={`/admin/courses/${course.id}`} variant="outline">
            Вернуться в builder
          </ActionLink>
        }
      />

      <SplitPageLayout
        content={
          <ContentArea>
            <CourseSettingsForm course={course} action={updateCourseSettingsAction} />
          </ContentArea>
        }
        sidebar={
          <SettingsPanel>
            <Stack gap="4">
              <Stack gap="1">
                <Text textStyle="overline" color="fg.subtle">
                  Служебная сводка
                </Text>
                <Text textStyle="sectionTitle" color="fg.default">
                  Мета-информация курса
                </Text>
              </Stack>

              <DataList.Root orientation="horizontal" gap="3">
                <DataList.Item>
                  <DataList.ItemLabel>Создан</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminDate(course.createdAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Обновлён</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminDate(course.updatedAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Публикация</DataList.ItemLabel>
                  <DataList.ItemValue>{formatAdminDate(course.publishedAt)}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Модулей</DataList.ItemLabel>
                  <DataList.ItemValue>{course.modules.length}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>Уроков</DataList.ItemLabel>
                  <DataList.ItemValue>{course.modules.reduce((total, courseModule) => total + courseModule.lessons.length, 0)}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            </Stack>
          </SettingsPanel>
        }
      />
    </PageLayout>
  );
}
