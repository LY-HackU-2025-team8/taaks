import { AddTaskDrawer } from '@/features/add-task/ui/add-task-drawer';
import { cn } from '@/shared/lib/utils';
import { RiveIcon } from '@/shared/ui/components/custom/rive-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Text } from '../components/typography/text';

export type AppNavProps = React.ComponentProps<'nav'> & {
  hidden?: boolean;
};

export const AppNav = ({
  hidden = true,
  className,
  ...props
}: AppNavProps & {
  className?: string;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav
      className={cn(
        'text-app-nav-foreground bg-app-nav-background fixed right-3.5 bottom-3.5 left-3.5 mb-[env(safe-area-inset-bottom)] rounded-full px-7',
        { hidden },
        className
      )}
      {...props}
    >
      <ul className="flex h-16 items-center justify-around gap-4">
        <li className="contents">
          <Link
            to="/dashboard"
            className="flex flex-1 flex-col items-center gap-1"
          >
            {(state) => (
              <>
                <RiveIcon
                  className="size-8"
                  iconType="Home"
                  isActive={state.isActive}
                />
                <Text
                  variant="muted"
                  className="font-line-seed text-[0.625rem] font-bold"
                >
                  ホーム
                </Text>
              </>
            )}
          </Link>
        </li>
        <li className="contents">
          <Link to="/todo" className="flex flex-1 flex-col items-center gap-1">
            {(state) => (
              <>
                <RiveIcon
                  className="size-8"
                  iconType="ToDo"
                  isActive={state.isActive}
                />
                <Text
                  variant="muted"
                  className="font-line-seed text-[0.625rem] font-bold"
                >
                  Todo
                </Text>
              </>
            )}
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
                  iconType="Plus"
                  isActive={isDrawerOpen}
                />
              </Button>
            }
          />
        </li>
        <li className="contents">
          <Link to="/diary" className="flex flex-1 flex-col items-center gap-1">
            {(state) => (
              <>
                <RiveIcon
                  className="size-8"
                  iconType="Diary"
                  isActive={state.isActive}
                />
                <Text
                  variant="muted"
                  className="font-line-seed text-[0.625rem] font-bold"
                >
                  日記
                </Text>
              </>
            )}
          </Link>
        </li>
        <li className="contents">
          <Link
            to="/account"
            className="flex flex-1 flex-col items-center gap-1"
          >
            {(state) => (
              <>
                <RiveIcon
                  className="size-8"
                  iconType="Account"
                  isActive={state.isActive}
                />
                <Text
                  variant="muted"
                  className="font-line-seed text-[0.625rem] font-bold"
                >
                  アカウント
                </Text>
              </>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
