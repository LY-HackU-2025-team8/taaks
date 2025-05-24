import { TaskCardLarge } from '@/entities/task/ui/task-card-large';
import { $api } from '@/shared/api/openapi-fetch';

export const VerticalTaskList = () => {
  const { data: tasks } = $api.useQuery('get', '/tasks');

  return (
    <div className="flex flex-col gap-3.5">
      {tasks?.content?.map((task) => (
        <TaskCardLarge key={task.id} task={task} />
      ))}
    </div>
  );
};
