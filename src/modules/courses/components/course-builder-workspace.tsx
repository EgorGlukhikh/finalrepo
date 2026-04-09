import { Box, Grid, Stack } from '@chakra-ui/react';

import type { LessonAnalytics } from '@/modules/analytics';
import type { CourseStructure } from '@/modules/courses';

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
      <BuilderStructurePanel
        course={course}
        selectedLessonId={selection?.lesson.id ?? null}
        createModuleAction={createModuleAction}
        createLessonDraftAction={createLessonDraftAction}
      />

      <Box
        pl={{ base: '0', xl: '10' }}
        borderLeftWidth={{ base: '0', xl: '1px' }}
        borderColor="border.subtle"
      >
        <Stack gap="8">
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
        </Stack>
      </Box>
    </Grid>
  );
}
