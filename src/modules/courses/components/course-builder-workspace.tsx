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
    <div className="grid gap-8 xl:grid-cols-[minmax(18rem,35%)_minmax(0,1fr)]">
      <BuilderStructurePanel
        course={course}
        selectedLessonId={selection?.lesson.id ?? null}
        createModuleAction={createModuleAction}
        createLessonDraftAction={createLessonDraftAction}
      />

      <div className="xl:border-l xl:border-border/70 xl:pl-8">
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
      </div>
    </div>
  );
}
