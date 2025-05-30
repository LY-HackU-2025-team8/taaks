import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/components/typography/text';
import type { TaskResponseModel } from '../api/task-model';
import { TaskCardSummary } from './task-card-summary';

type TaskHorizontalSummaryStackProps = React.ComponentProps<'div'> & {
  /** タスクのリスト */
  tasks: TaskResponseModel[];
};

export const TaskHorizontalSummaryStack = ({
  tasks,
  className,
  children,
  ...props
}: TaskHorizontalSummaryStackProps) => {
  return (
    <div
      className={cn(
        '-mx-3.5 flex items-stretch gap-3.5 overflow-x-auto px-3.5 py-1',
        className
      )}
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
