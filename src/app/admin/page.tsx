import { AdminDashboard } from '@/modules/admin/components/admin-dashboard';
import { getAdminDashboardAnalytics } from '@/modules/analytics';

export default async function AdminHomePage() {
  const analytics = await getAdminDashboardAnalytics();

  return <AdminDashboard analytics={analytics} />;
}
