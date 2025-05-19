import { createFileRoute, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onSuccess: '/dashboard' }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
