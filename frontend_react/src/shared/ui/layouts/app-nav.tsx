import { AddTaskDrawer } from '@/features/add-task/ui/add-task-drawer';
import { cn } from '@/shared/lib/utils';
import { RiveIcon } from '@/shared/ui/components/custom/rive-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Text } from '../components/typography/text';

type AppNavProps = React.ComponentProps<'nav'> & {
  hidden?: boolean;
};

/** 画面下のグローバルナビゲーション */
export const AppNav = ({
  hidden = true,
  className,
  ...props
}: AppNavProps & {
  className?: string;
}) => {
  // タスク追加ドロワーの開閉状態
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav
      className={cn(
        'text-app-nav-foreground bg-app-nav-background fixed right-3.5 bottom-[max(env(safe-area-inset-bottom),0.875rem)] left-3.5 z-15 rounded-full px-4',
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
                  className="font-line-seed text-2xs line-clamp-1 font-bold"
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
                  className="font-line-seed text-2xs line-clamp-1 font-bold"
                >
                  Todo
                </Text>
              </>
            )}
          </Link>
        </li>
        <li className="contents">
          <AddTaskDrawer onOpenChange={setIsDrawerOpen} open={isDrawerOpen}>
            <Button
              size="icon"
              className="bg-custom text-custom-foreground hover:bg-custom size-16 -translate-y-4 cursor-pointer rounded-2xl shadow-xl hover:-mx-1 hover:size-18"
            >
              <RiveIcon
                className="size-10"
                iconType="Plus"
                isActive={isDrawerOpen}
              />
            </Button>
          </AddTaskDrawer>
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
                  className="font-line-seed text-2xs line-clamp-1 font-bold"
                >
                  日記
                </Text>
              </>
            )}
          </Link>
        </li>
        <li className="contents">
          <Link to="/buddy" className="flex flex-1 flex-col items-center gap-1">
            {(state) => (
              <>
                <RiveIcon
                  className="size-8"
                  iconType="Account"
                  isActive={state.isActive}
                />
                <Text
                  variant="muted"
                  className="font-line-seed text-2xs line-clamp-1 font-bold"
                >
                  Buddy
                </Text>
              </>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
