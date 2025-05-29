import { TaskLoadScoreCard } from '@/features/task-load-score/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';

export const DashboardPersonal = () => {
  const { data } = $api.useSuspenseQuery('get', '/days/today');

  return (
    <PageSection>
      <PageSectionTitle>パーソナル</PageSectionTitle>
      <TaskLoadScoreCard loadScore={data?.loadScore} />
    </PageSection>
  );
};
