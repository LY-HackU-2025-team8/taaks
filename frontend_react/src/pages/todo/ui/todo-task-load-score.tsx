import { TaskLoadScoreCard } from '@/features/task-load-score/ui/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { format } from 'date-fns';

type TodoTaskLoadScoreProps = ComponentPropsWithoutChildren<
  typeof PageSection
> & {
  /** 表示する日付 */
  date: Date;
};

export const TodoTaskLoadScore = ({
  date,
  ...props
}: TodoTaskLoadScoreProps) => {
  const { data: dayStats } = $api.useSuspenseQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  return (
    <PageSection {...props}>
      <TaskLoadScoreCard loadScore={dayStats.loadScore || 0} />
    </PageSection>
  );
};
