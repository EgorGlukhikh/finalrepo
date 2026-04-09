import type { LessonAnalytics } from '@/modules/analytics';
import type { CourseStructure } from '@/modules/courses';
import { BuilderSidebar, ContentArea, ContentCanvas } from '@/components/product';
import { Grid } from '@chakra-ui/react';

import { getBuilderSelection } from '../builder';
import { BuilderLessonEditor } from './builder-lesson-editor';
import { BuilderStructurePanel } from './builder-structure-panel';

type CourseBuilderWorkspaceProps = {
  course: CourseStructure;
  selectedLessonId?: string | null;
  createModuleAction: (formData: FormData) => void | Promise<void>;
  createLessonDraftAction: (formData: FormData) => void | Promise<void>;
  updateLessonAction: (formData: FormData) => void | Promise<void>;
  setLessonStatusAction: (formData: FormData) => void | Promise<void>;
  deleteLessonAction: (formData: FormData) => void | Promise<void>;
  lessonMetrics?: LessonAnalytics[];
};

export function CourseBuilderWorkspace({
  course,
  selectedLessonId,
  createModuleAction,
  createLessonDraftAction,
  updateLessonAction,
  setLessonStatusAction,
  deleteLessonAction,
  lessonMetrics = [],
}: CourseBuilderWorkspaceProps) {
  const selection = getBuilderSelection(course, selectedLessonId);
  const selectedLessonMetrics = lessonMetrics.find((item) => item.lessonId === selection?.lesson.id) ?? null;

  return (
    <Grid
      gap={{ base: '8', xl: '10' }}
      templateColumns={{ base: '1fr', xl: 'minmax(19rem, 34%) minmax(0, 1fr)' }}
      alignItems="start"
    >
      <BuilderSidebar
        position={{ xl: 'sticky' }}
        top={{ xl: '24' }}
        maxH={{ xl: 'calc(100vh - 8rem)' }}
        overflowY={{ xl: 'auto' }}
      >
        <BuilderStructurePanel
          course={course}
          selectedLessonId={selection?.lesson.id ?? null}
          createModuleAction={createModuleAction}
          createLessonDraftAction={createLessonDraftAction}
        />
      </BuilderSidebar>

      <ContentArea gap="8">
        <ContentCanvas>
          <BuilderLessonEditor
            courseId={course.id}
            courseTitle={course.title}
            selectedLesson={selection?.lesson ?? null}
            selectedModule={selection?.module ?? null}
            selectedLessonMetrics={selectedLessonMetrics}
            updateLessonAction={updateLessonAction}
            setLessonStatusAction={setLessonStatusAction}
            deleteLessonAction={deleteLessonAction}
          />
        </ContentCanvas>
      </ContentArea>
    </Grid>
  );
}
