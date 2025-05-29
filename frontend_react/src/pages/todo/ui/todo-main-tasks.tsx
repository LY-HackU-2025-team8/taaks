import { TaskLoadScoreCard } from '@/features/task-load-score/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';

type TodoMainTasksProps = ComponentPropsWithoutChildren<typeof PageSection> & {
  /** 表示するタスクの日付 */
  date: Date;
};

export const TodoMainTasks = ({ date, ...props }: TodoMainTasksProps) => {
  const { data } = $api.useQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  return (
    <PageSection {...props}>
      <PageSectionTitle>主要なタスク</PageSectionTitle>
      <TaskLoadScoreCard loadScore={data?.loadScore} />
    </PageSection>
  );
};
