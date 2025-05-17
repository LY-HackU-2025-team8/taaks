import { AddTaskDrawer } from '@/features/add-task/ui/add-task-drawer';
import { Button } from '@/shared/ui/components/shadcn/button';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { LucidePlus } from 'lucide-react';
import { checkLogin } from '../api/require-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
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
    </>
  );
}
