import { AppNav } from '@/shared/ui/app-nav/app-nav';
import { AppNavContext } from '@/shared/ui/app-nav/app-nav-context';
import { useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { requireLogin } from '../api/require-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await requireLogin(queryClient, { to: '/login' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [hidden, setHidden] = useState(true);

  return (
    <AppNavContext
      value={{
        showAppNav: () => setHidden(false),
        hideAppNav: () => setHidden(true),
      }}
    >
      <Outlet />
      <AppNav hidden={hidden} />
    </AppNavContext>
  );
}
