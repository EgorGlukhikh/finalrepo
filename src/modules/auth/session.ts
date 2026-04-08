import { getServerAuthSession } from '@/lib/auth';

export function getAuthSession() {
  return getServerAuthSession();
}
