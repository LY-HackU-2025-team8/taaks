import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/components/typography/text';
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
      {tasks.length ? (
        tasks.map((task) => (
          <TaskCardSummary
            task={task}
            key={task.id}
            className="flex-shrink-0"
          />
        ))
      ) : (
        <Text variant="muted">この日は登録されたタスクがありません</Text>
      )}
      {children}
    </div>
  );
};
