import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface RootRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.VITE_SHOW_TANSTACK_ROUTER_DEVTOOLS === "true" && <TanStackRouterDevtools position="top-right" />}
    </>
  ),
});
