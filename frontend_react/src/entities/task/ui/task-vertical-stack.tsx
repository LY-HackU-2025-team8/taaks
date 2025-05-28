import { cn } from '@/shared/lib/utils';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardLarge } from './task-card-large';

type TaskVerticalStackProps = React.ComponentProps<'div'> & {
  /** タスクのリスト */
  tasks: TaskResponseModel[];
};

export const TaskVerticalStack = ({
  tasks,
  className,
  children,
  ...props
}: TaskVerticalStackProps) => {
  return (
    <div className={cn('flex flex-col gap-3.5', className)} {...props}>
      {tasks.map((task) => (
        <TaskCardLarge task={task} key={task.id} />
      ))}
      {children}
    </div>
  );
};
