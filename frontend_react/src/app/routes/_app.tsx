import { $api } from '@/shared/api/openapi-fetch';
import { CUSTOM_COLORS } from '@/shared/constants';
import { AppNav } from '@/shared/ui/layouts/app-nav';
import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
import { Loading } from '@/shared/ui/layouts/loading';
import { useCallback, useEffect, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { redirectUnlessLoggedIn } from '../api/require-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
  },
  component: RouteComponent,
  pendingComponent: Loading,
});

function RouteComponent() {
  const [hidden, setHidden] = useState(true);
  const { setTheme } = useTheme();
  const { data: buddy } = $api.useQuery('get', '/buddy');
  const colorId = buddy?.colorId;

  /** AppNavを非表示にする */
  const showAppNav = useCallback(() => {
    setHidden(false);
  }, []);

  /** AppNavを表示する */
  const hideAppNav = useCallback(() => {
    setHidden(true);
  }, []);

  useEffect(() => {
    // ユーザーが選択した色に応じてテーマを設定
    if (colorId !== undefined) {
      setTheme(CUSTOM_COLORS.get(colorId) || 'default');
    } else {
      setTheme('default'); // デフォルトテーマ
    }
  }, [colorId, setTheme]);

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
