import { $api } from '@/shared/api/openapi-fetch';
import { TaaksLogo } from '@/shared/ui/components/icons/taaks-logo';
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

  return (
    <div className="mt-[env(safe-area-inset-top)] flex h-screen flex-col">
      <div className="relative flex h-full flex-col items-center justify-center overflow-x-hidden pt-[10vh]">
        <img
          src="/assets/images/todo_3d.png"
          width={120}
          height={120}
          alt="Todo 3D"
          className="absolute top-20 -left-2 -z-10"
        />
        <img
          src="/assets/images/diary_3d.png"
          width={240}
          height={240}
          alt="Diary 3D"
          className="absolute -top-5 -right-5 z-10 -rotate-12"
        />
        <TaaksLogo className="size-52" aria-label="Taaks Logo" role="img" />
        <p className="text-[3.75rem] font-bold">Taaks!</p>
      </div>
      <Outlet />
    </div>
  );
}
