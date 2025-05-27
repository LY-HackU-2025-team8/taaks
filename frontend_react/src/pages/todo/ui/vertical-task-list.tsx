import { TaskCardLarge } from '@/entities/task/ui/task-card-large';
import { TaskCardSkeleton } from '@/entities/task/ui/task-card-skeleton';
import { filterToday } from '@/shared/api/filter-today';
import { $api } from '@/shared/api/openapi-fetch';

export type VerticalTaskListProps = React.ComponentProps<'div'> & {
  date?: Date;
};

export const VerticalTaskList = ({ date, ...props }: VerticalTaskListProps) => {
  const { data: tasks, isLoading } = $api.useQuery('get', '/tasks', {
    params: {
      query: {
        ...(date && filterToday(date)),
      },
    },
  });

  return (
    <div className="flex flex-col gap-3.5" {...props}>
      {isLoading
        ? [...Array(10)].map((_, i) => <TaskCardSkeleton key={i} />)
        : tasks?.content?.map((task) => (
            <TaskCardLarge key={task.id} task={task} />
          ))}
    </div>
  );
};
