import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <nav className="bg-background fixed right-0 bottom-0 left-0 flex h-16 gap-4 border-t p-4">
        <Link to="/">Home</Link>
        <Link to="/diary">Diary</Link>
        <Link to="/todo">Todo</Link>
      </nav>
      <TanStackRouterDevtools
        toggleButtonProps={{ class: 'mb-[calc(64px)]' }}
      />
    </>
  ),
});
