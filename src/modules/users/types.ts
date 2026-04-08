import type { UserRole } from '@prisma/client';

export type UserSummary = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
};
