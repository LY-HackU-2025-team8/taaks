import { $api } from '@/shared/api/openapi-fetch';
import { AppNav } from '@/shared/ui/layouts/app-nav';
import { AppNavContext } from '@/shared/ui/layouts/app-nav-context';
import { useCallback, useState, useEffect } from 'react';
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

// export const Route = createFileRoute('/_app')({
//   beforeLoad: async ({ context: { queryClient } }) => {
//     await checkLogin(queryClient, { onError: '/' });

//     // const { data: buddy } = await $api.useQuery('get', '/buddy');
//     // const colorId = typeof buddy?.colorId === 'number' ? buddy.colorId - 1 : 0;
//     // const selectedTheme = colorThemes[colorId] ?? 'light';
//     // setTheme(selectedTheme);
//   },
//   component: RouteComponent,
// });

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
    <ThemeProvider attribute="class" themes={colorThemes} defaultTheme="light">
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
  }, [buddy, setTheme]);

  return null;
};
