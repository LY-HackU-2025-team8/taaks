import { $api } from '@/shared/api/openapi-fetch';
import { useEffect } from 'react';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { isSuccess } = $api.useQuery('get', '/users/me');

  // ログインしている場合はダッシュボードへリダイレクト
  useEffect(() => {
    if (isSuccess) navigate({ to: '/dashboard' });
  }, [isSuccess, navigate]);

  return <Outlet />;
}
