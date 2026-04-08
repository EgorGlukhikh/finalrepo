import { ActionLink, Section, SectionHeader, Stack } from '@/components/layout';
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
    <Section padding="lg">
      <Stack gap="xl">
        <SectionHeader
          eyebrow="Админка"
          title="Курсы"
          description="Админка остается точкой входа. Само редактирование идет через конструктор курса, а не через длинную форму."
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <Stack gap="md">
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
                    <TableHeaderCell>Обновлен</TableHeaderCell>
                    <TableHeaderCell className="w-[20rem]">Действия</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{course.title}</div>
                          <div className="text-xs text-muted-foreground">{course.slug}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge tone={getCourseStatusTone(course.status)}>{getCourseStatusLabel(course.status)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Badge tone={getAccessTypeTone(course.accessType)}>{getAccessTypeLabel(course.accessType)}</Badge>
                          <div className="text-xs text-muted-foreground">
                            {course.accessType === 'PAID' ? formatAdminCurrency(course.priceAmount) : 'Без оплаты'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-foreground">
                          {course.modulesCount} модулей
                          <div className="text-xs text-muted-foreground">{course.lessonsCount} уроков</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatAdminDate(course.updatedAt)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <ActionLink href={`/admin/courses/${course.id}`} variant="secondary">
                            Открыть конструктор
                          </ActionLink>
                          <form action={setCourseStatusAction}>
                            <input type="hidden" name="courseId" value={course.id} />
                            <input type="hidden" name="status" value={course.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'} />
                            <input type="hidden" name="returnPath" value="/admin/courses" />
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Stack>

          <CourseCreateCard action={createCourseAction} />
        </div>
      </Stack>
    </Section>
  );
}
