import { Stack, Text } from '@chakra-ui/react';

import { ActionLink } from '@/components/layout';
import { ActionBar, ContentArea, HeaderBar, PageLayout, SettingsPanel, SplitPageLayout } from '@/components/product';
import { Badge, Button, EmptyState, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui';
import {
  formatAdminCurrency,
  formatAdminDate,
  getAccessTypeLabel,
  getAccessTypeTone,
  getCourseStatusLabel,
  getCourseStatusTone,
} from '@/modules/admin/format';
import { listCoursesForAdmin } from '@/modules/courses';
import { createCourseAction, deleteCourseAction, duplicateCourseAction, setCourseStatusAction } from '@/modules/courses/actions';
import { CourseCreateCard } from '@/modules/courses/components';

export default async function AdminCoursesPage() {
  const courses = await listCoursesForAdmin();

  return (
    <PageLayout spacing="lg">
      <HeaderBar
        eyebrow="Админка"
        title="Курсы"
        description="Админка остаётся точкой входа. Само редактирование идёт через конструктор курса, а не через длинную форму."
      />

      <SplitPageLayout
        content={
          <ContentArea gap="4">
            {courses.length === 0 ? (
              <EmptyState title="Пока нет курсов" description="Создайте первый курс справа. После этого он сразу откроется в конструкторе." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Курс</TableHeaderCell>
                    <TableHeaderCell>Статус</TableHeaderCell>
                    <TableHeaderCell>Доступ</TableHeaderCell>
                    <TableHeaderCell>Структура</TableHeaderCell>
                    <TableHeaderCell>Обновлён</TableHeaderCell>
                    <TableHeaderCell>Действия</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <Stack gap="1">
                          <Text textStyle="bodyStrong" color="fg.default">
                            {course.title}
                          </Text>
                          <Text textStyle="caption" color="fg.muted">
                            {course.slug}
                          </Text>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Badge tone={getCourseStatusTone(course.status)}>{getCourseStatusLabel(course.status)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Stack gap="2">
                          <Badge tone={getAccessTypeTone(course.accessType)}>{getAccessTypeLabel(course.accessType)}</Badge>
                          <Text textStyle="caption" color="fg.muted">
                            {course.accessType === 'PAID' ? formatAdminCurrency(course.priceAmount) : 'Без оплаты'}
                          </Text>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack gap="1">
                          <Text textStyle="bodyStrong" color="fg.default">
                            {course.modulesCount} модулей
                          </Text>
                          <Text textStyle="caption" color="fg.muted">
                            {course.lessonsCount} уроков
                          </Text>
                        </Stack>
                      </TableCell>
                      <TableCell>{formatAdminDate(course.updatedAt)}</TableCell>
                      <TableCell>
                        <ActionBar>
                          <ActionLink href={`/admin/courses/${course.id}`} variant="secondary">
                            Открыть конструктор
                          </ActionLink>
                          <form action={setCourseStatusAction}>
                            <input type="hidden" name="courseId" value={course.id} />
                            <input type="hidden" name="status" value={course.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'} />
                            <input type="hidden" name="returnPath" value="/admin/courses" />
                            <Button type="submit" variant="ghost">
                              {course.status === 'PUBLISHED' ? 'Снять с публикации' : 'Опубликовать'}
                            </Button>
                          </form>
                          <form action={duplicateCourseAction}>
                            <input type="hidden" name="courseId" value={course.id} />
                            <Button type="submit" variant="ghost">
                              Дублировать
                            </Button>
                          </form>
                          <form action={deleteCourseAction}>
                            <input type="hidden" name="courseId" value={course.id} />
                            <input type="hidden" name="returnPath" value="/admin/courses" />
                            <Button type="submit" variant="danger">
                              Удалить
                            </Button>
                          </form>
                        </ActionBar>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ContentArea>
        }
        sidebar={
          <SettingsPanel>
            <CourseCreateCard action={createCourseAction} />
          </SettingsPanel>
        }
      />
    </PageLayout>
  );
}
