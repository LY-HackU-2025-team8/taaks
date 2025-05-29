import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/components/typography/text';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardSmallBuddy } from './task-card-small-buddy';
import { TaskCardSmall } from './task-card-small';

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
        'flex items-stretch gap-3.5 overflow-x-auto py-1',
        className
      )}
      {...props}
    >
      {suggestedTasks?.map((task) => (
        <TaskCardSmallBuddy
          task={task}
          key={task.id}
          className="flex-shrink-0"
        />
      ))}
      {tasks.map((task) => (
        <TaskCardSmall task={task} key={task.id} className="flex-shrink-0" />
      ))}
      {!tasks.length && !suggestedTasks?.length && (
        <Text variant="muted">タスクがありません</Text>
      )}
      {children}
    </div>
  );
};
