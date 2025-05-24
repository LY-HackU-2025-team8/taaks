import { AppNavContext } from '@/shared/ui/app-nav/app-nav-context';
import { use, useEffect } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages')({
  component: RouteComponent,
});

function RouteComponent() {
  const { setHidden } = use(AppNavContext);

  useEffect(() => {
    setHidden?.(false);

    return () => {
      setHidden?.(true);
    };
  }, [setHidden]);

  return (
    <div className="bg-muted h-full">
      <Outlet />
    </div>
  );
}
