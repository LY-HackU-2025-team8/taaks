import { AddTaskDrawer } from '@/features/add-task/ui/add-task-drawer';
import { RiveIcon } from '@/shared/ui/components/custom/rive-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { checkLogin } from '../api/check-login';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context: { queryClient } }) =>
    checkLogin(queryClient, { onError: '/' }),
  component: RouteComponent,
});

function RouteComponent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
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
              <RiveIcon
                className="size-8"
                iconType="Home"
                isActive={currentPath === '/dashboard'}
              />
              Home
            </Link>
          </li>
          <li className="contents">
            <Link
              to="/todo"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <RiveIcon
                className="size-8"
                iconType="ToDo"
                isActive={currentPath === '/todo'}
              />
              Todo
            </Link>
          </li>
          <li className="contents">
            <AddTaskDrawer
              onOpenChange={setIsDrawerOpen}
              open={isDrawerOpen}
              triggerComponent={
                <Button
                  size="icon"
                  className="bg-custom text-custom-foreground size-16 -translate-y-4 rounded-2xl shadow-xl"
                >
                  <RiveIcon
                    className="size-10"
                    iconType="PLUS"
                    isActive={isDrawerOpen}
                  />
                </Button>
              }
            />
          </li>
          <li className="contents">
            <Link
              to="/diary"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <RiveIcon
                className="size-8"
                iconType="Diary"
                isActive={currentPath === '/diary'}
              />
              Diary
            </Link>
          </li>
          <li className="contents">
            <Link
              to="/account"
              className="flex flex-1 flex-col items-center gap-1 text-[0.625rem]"
            >
              <RiveIcon
                className="size-8"
                iconType="Account"
                isActive={currentPath === '/account'}
              />
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
