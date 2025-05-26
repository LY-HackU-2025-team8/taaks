import { TaskCardLarge } from '@/entities/task/ui/task-card-large';
import { $api } from '@/shared/api/openapi-fetch';
import { SERVER_DATETIME_FORMAT } from '@/shared/constant';
import { format } from 'date-fns';

export type VerticalTaskListProps = React.ComponentProps<'div'> & {
  date?: Date;
};

export const VerticalTaskList = ({ date, ...props }: VerticalTaskListProps) => {
  const { data: tasks } = $api.useQuery('get', '/tasks', {
    params: {
      query: {
        ...(date && {
          dueAt_gt: format(date, SERVER_DATETIME_FORMAT),
          dueAt_lt: format(
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              23,
              59,
              59
            ),
            SERVER_DATETIME_FORMAT
          ),
        }),
      },
    },
  });

  return (
    <div className="flex flex-col gap-3.5" {...props}>
      {tasks?.content?.map((task) => (
        <TaskCardLarge key={task.id} task={task} />
      ))}
    </div>
  );
};
