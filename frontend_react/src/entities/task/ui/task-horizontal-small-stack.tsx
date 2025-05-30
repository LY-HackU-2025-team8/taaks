import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/components/typography/text';
import type { SuggestedTaskResponseModel } from '../api/suggested-task-model';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardSmall } from './task-card-small';
import { TaskCardSmallBuddy } from './task-card-small-buddy';

type TaskHorizontalSmallStackProps = React.ComponentProps<'div'> & {
  /** タスクのリスト */
  tasks?: TaskResponseModel[];
  /** おすすめされたタスク */
  suggestedTasks?: SuggestedTaskResponseModel[];
  /** タスクが1つもない時にレンダリングされる */
  emptyText?: React.ReactNode;
};

export const TaskHorizontalSmallStack = ({
  tasks,
  suggestedTasks,
  className,
  children,
  emptyText,
  ...props
}: TaskHorizontalSmallStackProps) => {
  return (
    <div
      className={cn(
        '-mx-3.5 flex items-stretch gap-3.5 overflow-x-auto px-3.5 py-1',
        className
      )}
      {...props}
    >
      {suggestedTasks?.map((task, i) => (
        <TaskCardSmallBuddy
          task={task}
          key={i}
          className="-order-2 flex-shrink-0"
        />
      ))}
      {tasks?.map((task, i) => (
        <TaskCardSmall
          task={task}
          key={task.id}
          className={cn('flex-shrink-0', {
            '-order-3': i === 0,
            '-order-2': i > 0,
          })}
        />
      ))}
      {!tasks?.length &&
        !suggestedTasks?.length &&
        (emptyText !== undefined ? (
          emptyText
        ) : (
          <Text variant="muted">タスクがありません</Text>
        ))}
      {children}
    </div>
  );
};
