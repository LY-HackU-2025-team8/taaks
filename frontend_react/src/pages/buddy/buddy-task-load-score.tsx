import { TaskLoadScoreCard } from '@/features/task-load-score/ui/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';



export const BuddyTaskLoadScore = () => {
  const { data } = $api.useSuspenseQuery('get', '/days/today');

  return (
    <TaskLoadScoreCard loadScore={data.loadScore || 0}
      className='bg-card'
    />
  );
};
