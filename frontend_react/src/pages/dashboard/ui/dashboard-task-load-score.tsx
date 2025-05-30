import { TaskLoadScoreCard } from '@/features/task-load-score/ui/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';
import { PageSection } from '@/shared/ui/layouts/page-section';

export const DashboardTaskLoadScore = () => {
  const { data } = $api.useSuspenseQuery('get', '/days/today');

  return (
    <PageSection>
      <TaskLoadScoreCard loadScore={data.loadScore || 0} />
    </PageSection>
  );
};
