import { $api } from '@/shared/api/openapi-fetch';
import { CUSTOM_COLORS } from '@/shared/constants';
import { AppNav } from '@/shared/ui/layouts/app-nav';
import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
import { useCallback, useEffect, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { redirectUnlessBuddyExists } from '../api/redirect-unless-buddy-exists';
import { redirectUnlessLoggedIn } from '../api/redirect-unless-logged-in';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
    await redirectUnlessBuddyExists(queryClient, { to: '/create-buddy' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [hidden, setHidden] = useState(true);
  const { setTheme } = useTheme();

  const { data: buddy, isSuccess } = $api.useQuery('get', '/buddy');
  console.log(isSuccess, buddy);
  const colorId = isSuccess ? buddy?.colorId : 1;
  
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
