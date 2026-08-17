import { getCurrentAdmin } from '@/app/actions/authActions';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  // If the admin is not logged in, we are either rendering the /admin/login page 
  // or middleware is redirecting. Just render children directly without dashboard shell!
  if (!admin) {
    return <>{children}</>;
  }

  // Render premium sidebar admin layout shell
  return (
    <AdminLayoutClient adminName={admin.name} adminEmail={admin.email}>
      {children}
    </AdminLayoutClient>
  );
}
