import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { AddTaskDrawer } from '@/entities/task/ui/add-task-drawer';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/components/shadcn/button';

type BuddySuggestAddTaskProps = React.ComponentProps<
  typeof BuddyMessageCard
> & {
  buttonText?: React.ReactNode;
};

/** 明日のタスクを整理することを促すカード */
export const BuddySuggestAddTask = ({
  buttonText,
  className,
  children,
  ...props
}: BuddySuggestAddTaskProps) => {
  return (
    <BuddyMessageCard
      className={cn('h-40 overflow-clip', className)}
      {...props}
    >
      <img
        src="/assets/images/todo_3d.png"
        alt="タスクバインダーのイラスト"
        className="absolute top-0 -right-8 bottom-0 my-auto size-60"
      />
      <BuddyMessageCardHeader>
        <BuddyMessageCardDescription>
          Buddyからの提案
        </BuddyMessageCardDescription>
      </BuddyMessageCardHeader>
      <BuddyMessageCardContent className="break-keep">
        {children}
      </BuddyMessageCardContent>
      <AddTaskDrawer>
        <Button
          variant="primary-inverted"
          size="sm"
          className="absolute right-3.5 bottom-3.5"
        >
          {buttonText}
        </Button>
      </AddTaskDrawer>
    </BuddyMessageCard>
  );
};
