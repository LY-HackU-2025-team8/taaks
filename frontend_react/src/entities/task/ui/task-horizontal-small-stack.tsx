import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/components/typography/text';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardSmall } from './task-card-small';
import { TaskCardSmallBuddy } from './task-card-small-buddy';

type TaskHorizontalSmallStackProps = React.ComponentProps<'div'> & {
  /** タスクのリスト */
  tasks: TaskResponseModel[];
  /** おすすめされたタスク */
  suggestedTasks?: TaskResponseModel[];
};

export const TaskHorizontalSmallStack = ({
  tasks,
  suggestedTasks,
  className,
  children,
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
      {suggestedTasks?.map((task) => (
        <TaskCardSmallBuddy
          task={task}
          key={task.id}
          className="-order-2 flex-shrink-0"
        />
      ))}
      {tasks.map((task, i) => (
        <TaskCardSmall
          task={task}
          key={task.id}
          className={cn('flex-shrink-0', {
            '-order-3': i === 0,
            '-order-2': i > 0,
          })}
        />
      ))}
      {!tasks.length && !suggestedTasks?.length && (
        <Text variant="muted">タスクがありません</Text>
      )}
      {children}
    </div>
  );
};
