import { SimpleGrid } from '@chakra-ui/react';

import { StatCard } from '@/components/branding';

import type { CourseAnalytics } from '../types';

type CourseAnalyticsStripProps = {
  analytics: CourseAnalytics;
};

export function CourseAnalyticsStrip({ analytics }: CourseAnalyticsStripProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
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
    </SimpleGrid>
  );
}
