import { cn } from '@/shared/lib/utils';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardSummary } from './task-card-summary';

type TaskHorizontalStackProps = React.ComponentProps<'div'> & {
  /** タスクのリスト */
  tasks: TaskResponseModel[];
};

export const TaskHorizontalStack = ({
  tasks,
  className,
  children,
  ...props
}: TaskHorizontalStackProps) => {
  return (
    <div
      className={cn('flex gap-4 overflow-x-auto py-1', className)}
      {...props}
    >
      {tasks.map((task) => (
        <TaskCardSummary task={task} key={task.id} className="flex-shrink-0" />
      ))}
      {children}
    </div>
  );
};
