import { AppNav } from '@/shared/ui/layouts/app-nav';
import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
import { useCallback, useState, useEffect } from 'react';
import { $api } from '@/shared/api/openapi-fetch';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { redirectUnlessLoggedIn } from '../api/require-login';
import { ThemeProvider, useTheme } from 'next-themes';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) => {
    await redirectUnlessLoggedIn(queryClient, { to: '/login' });
  },
  component: RouteComponent,
});

const colorThemes = [
  'green',
  'yellow',
  'red',
  'pink',
  'purple',
  'blue',
  'cyan',
];

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
    <ThemeProvider>
      <ThemeInitializer />
      <AppNavContext
        value={{
          showAppNav,
          hideAppNav,
        }}
      >
        <Outlet />
        <AppNav hidden={hidden} />
      </AppNavContext>
    </ThemeProvider>
  );
}

const ThemeInitializer = () => {
  const { setTheme } = useTheme();
  const { data: buddy } = $api.useQuery('get', '/buddy');

  useEffect(() => {
    if (!buddy) return;

    const colorId = typeof buddy.colorId === 'number' ? buddy.colorId - 1 : 0;
    const selectedTheme = colorThemes[colorId] ?? 'green';

    setTheme(selectedTheme);
    console.log('Theme set to:', selectedTheme);
  }, [buddy, setTheme]);

  return null;
};
