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
      className={`flex flex-row gap-4 overflow-x-auto ${className}`}
      {...props}
    >
      {tasks.map((task) => (
        <TaskCardSummary task={task} key={task.id} className="flex-shrink-0" />
      ))}
      {children}
    </div>
  );
};
