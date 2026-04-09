import { StatCard } from '@/components/branding';
import { Grid } from '@/components/layout';

import type { CourseAnalytics } from '../types';

type CourseAnalyticsStripProps = {
  analytics: CourseAnalytics;
};

export function CourseAnalyticsStrip({ analytics }: CourseAnalyticsStripProps) {
  return (
    <Grid cols={3} gap="md">
      <StatCard
        label="Студенты"
        value={analytics.studentsCount}
        description={`${analytics.startedStudentsCount} начали курс`}
      />
      <StatCard
        label="Завершили"
        value={analytics.completionsCount}
        description={`${analytics.completionRate}% от активных учеников`}
        tone="success"
      />
      <StatCard
        label="Средний прогресс"
        value={`${analytics.averageProgress}%`}
        description={`${analytics.publishedLessonsCount} опубликованных уроков`}
        tone="primary"
      />
    </Grid>
  );
}
