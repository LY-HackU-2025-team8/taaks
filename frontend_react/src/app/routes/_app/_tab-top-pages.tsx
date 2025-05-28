import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
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

  // tab-top-pages ルートに入った時にアプリナビゲーションを表示し、出た時に非表示にする
  useEffect(() => {
    showAppNav();

    return () => hideAppNav();
  }, [hideAppNav, showAppNav]);

  return <Outlet />;
}
