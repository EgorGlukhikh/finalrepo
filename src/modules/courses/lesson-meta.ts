import { LessonType } from '@prisma/client';

export const lessonTypeLabels: Record<LessonType, string> = {
  REGULAR: 'Обычный урок',
  ASSIGNMENT: 'Задание',
  TEST: 'Тест',
  WEBINAR: 'Вебинар',
};

export const lessonTypeDescriptions: Record<LessonType, string> = {
  REGULAR: 'Материал для объяснения темы, примеров и пошаговых сценариев.',
  ASSIGNMENT: 'Практика с ожидаемым результатом и проверкой выполнения.',
  TEST: 'Контрольная точка для проверки понимания и закрепления.',
  WEBINAR: 'Живой или записанный эфир с расписанием и ссылками.',
};

export const lessonTypeMarkers: Record<LessonType, string> = {
  REGULAR: 'R',
  ASSIGNMENT: 'A',
  TEST: 'T',
  WEBINAR: 'W',
};

export const lessonDraftTitles: Record<LessonType, string> = {
  REGULAR: 'Новый урок',
  ASSIGNMENT: 'Новое задание',
  TEST: 'Новый тест',
  WEBINAR: 'Новый вебинар',
};
