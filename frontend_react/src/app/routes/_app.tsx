import { AppNav } from '@/shared/ui/layouts/app-nav';
import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
import { useCallback, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { redirectUnlessLoggedIn } from '../api/require-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [hidden, setHidden] = useState(true);

  /** AppNavを非表示にする */
  const showAppNav = useCallback(() => {
    setHidden(false);
  }, []);

  /** AppNavを表示する */
  const hideAppNav = useCallback(() => {
    setHidden(true);
  }, []);

  return (
    <AppNavContext
      value={{
        showAppNav,
        hideAppNav,
      }}
    >
      <Outlet />
      <AppNav hidden={hidden} />
    </AppNavContext>
  );
}
