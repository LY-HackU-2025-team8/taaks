import { AddTaskDrawer } from '@/feature/ui/add-task/add-task-drawer';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { LucidePlus } from 'lucide-react';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <nav className="bg-background fixed right-0 bottom-0 left-0 border-t px-4 pb-[env(safe-area-inset-bottom)]">
        <ul className="flex h-16 items-center justify-center gap-4">
          <li className="contents">
            <Link to="/diary">Diary</Link>
          </li>
          <li className="contents">
            <AddTaskDrawer
              triggerComponent={
                <Button size="icon" variant="default" className="rounded-full">
                  <LucidePlus />
                </Button>
              }
            />
          </li>
          <li className="contents">
            <Link to="/todo">Todo</Link>
          </li>
        </ul>
      </nav>
      <TanStackRouterDevtools position="top-right" />
    </>
  ),
});
