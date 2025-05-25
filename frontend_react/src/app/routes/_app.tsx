import { AppNav } from '@/shared/ui/app-nav/app-nav';
import { AppNavContext } from '@/shared/ui/app-nav/app-nav-context';
import { useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await checkLogin(queryClient, { onError: '/' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [hidden, setHidden] = useState(true);

  return (
    <AppNavContext value={{ setHidden }}>
      <Outlet />
      <AppNav hidden={hidden} />
    </AppNavContext>
  );
}
