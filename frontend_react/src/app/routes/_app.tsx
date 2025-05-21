import { AddTaskDrawer } from '@/features/add-task/ui/add-task-drawer';
import { Button } from '@/shared/ui/components/shadcn/button';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import {
  LucideCircleCheckBig,
  LucideHome,
  LucideNotebook,
  LucidePlus,
  LucideUser,
} from 'lucide-react';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <nav className="text-muted fixed right-3.5 bottom-3.5 left-3.5 mb-[env(safe-area-inset-bottom)] rounded-full bg-[#33362C] px-7">
        <ul className="flex h-16 items-center justify-around gap-4">
          <li className="contents">
            <Link
              to="/dashboard"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <LucideHome />
              Home
            </Link>
          </li>
          <li className="contents">
            <Link
              to="/todo"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <LucideCircleCheckBig />
              Todo
            </Link>
          </li>
          <li className="contents">
            <AddTaskDrawer
              triggerComponent={
                <Button
                  size="icon"
                  className="bg-custom text-custom-foreground size-16 -translate-y-4 rounded-2xl shadow-xl"
                >
                  <LucidePlus className="size-8" />
                </Button>
              }
            />
          </li>
          <li className="contents">
            <Link
              to="/diary"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <LucideNotebook />
              Diary
            </Link>
          </li>
          <li className="contents">
            <Link
              to="/account"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <LucideUser />
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
