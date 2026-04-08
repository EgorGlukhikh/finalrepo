import type {
  CourseAccessType,
  CourseStatus,
  EnrollmentAccessSource,
  EnrollmentStatus,
  OrderStatus,
  PaymentEventType,
  UserRole,
} from '@prisma/client';

export function formatAdminDate(value: Date | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value);
}

export function formatAdminCurrency(amount: number | null) {
  if (amount == null) {
    return '—';
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCourseStatusLabel(status: CourseStatus) {
  switch (status) {
    case 'DRAFT':
      return 'Черновик';
    case 'PUBLISHED':
      return 'Опубликован';
    case 'ARCHIVED':
      return 'Архив';
  }
}

export function getCourseStatusTone(status: CourseStatus): 'outline' | 'secondary' | 'warning' {
  switch (status) {
    case 'DRAFT':
      return 'outline';
    case 'PUBLISHED':
      return 'secondary';
    case 'ARCHIVED':
      return 'warning';
  }
}

export function getAccessTypeLabel(accessType: CourseAccessType) {
  switch (accessType) {
    case 'FREE':
      return 'Бесплатный';
    case 'PAID':
      return 'Платный';
    case 'PRIVATE':
      return 'Закрытый';
  }
}

export function getAccessTypeTone(accessType: CourseAccessType): 'success' | 'primary' | 'outline' {
  switch (accessType) {
    case 'FREE':
      return 'success';
    case 'PAID':
      return 'primary';
    case 'PRIVATE':
      return 'outline';
  }
}

export function getEnrollmentSourceLabel(accessSource: EnrollmentAccessSource) {
  switch (accessSource) {
    case 'FREE':
      return 'Free';
    case 'PURCHASE':
      return 'Оплата';
    case 'MANUAL':
      return 'Вручную';
  }
}

export function getEnrollmentSourceTone(accessSource: EnrollmentAccessSource): 'success' | 'primary' | 'secondary' {
  switch (accessSource) {
    case 'FREE':
      return 'success';
    case 'PURCHASE':
      return 'primary';
    case 'MANUAL':
      return 'secondary';
  }
}

export function getEnrollmentStatusLabel(status: EnrollmentStatus) {
  switch (status) {
    case 'ACTIVE':
      return 'Активен';
    case 'REVOKED':
      return 'Отозван';
  }
}

export function getEnrollmentStatusTone(status: EnrollmentStatus): 'success' | 'danger' {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'REVOKED':
      return 'danger';
  }
}

export function getOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case 'PENDING':
      return 'Ожидает';
    case 'PAID':
      return 'Оплачен';
    case 'FAILED':
      return 'Ошибка';
    case 'CANCELED':
      return 'Отменен';
  }
}

export function getOrderStatusTone(status: OrderStatus): 'outline' | 'success' | 'danger' | 'warning' {
  switch (status) {
    case 'PENDING':
      return 'outline';
    case 'PAID':
      return 'success';
    case 'FAILED':
      return 'danger';
    case 'CANCELED':
      return 'warning';
  }
}

export function getPaymentEventLabel(eventType: PaymentEventType) {
  switch (eventType) {
    case 'RESULT':
      return 'ResultURL';
    case 'SUCCESS':
      return 'SuccessURL';
    case 'FAIL':
      return 'FailURL';
  }
}

export function getRoleLabel(role: UserRole) {
  switch (role) {
    case 'ADMIN':
      return 'Администратор';
    case 'USER':
      return 'Студент';
  }
}

export function getRoleTone(role: UserRole): 'primary' | 'secondary' {
  switch (role) {
    case 'ADMIN':
      return 'primary';
    case 'USER':
      return 'secondary';
  }
}
