import { AppNavContext } from '@/shared/ui/app-nav/app-nav-context';
import { use, useEffect } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: 'bg-muted',
    appClassName: 'bg-muted pb-[calc(env(safe-area-inset-bottom)+6rem)]',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { hideAppNav, showAppNav } = use(AppNavContext);

  useEffect(() => {
    showAppNav();

    return () => hideAppNav();
  }, [hideAppNav, showAppNav]);

  return <Outlet />;
}
