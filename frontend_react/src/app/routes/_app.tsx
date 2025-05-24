import { createFileRoute, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
