import { TaskHorizontalSmallStack } from '@/entities/task/ui/task-horizontal-small-stack';
import { filterTodayTasks } from '@/shared/api/filter-today';
import { getNextPageParam } from '@/shared/api/get-next-page-param';
import { selectRandomOne } from '@/shared/api/get-random-one';
import { $api } from '@/shared/api/openapi-fetch';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { isSameDay } from 'date-fns';

type TodoMainTasksProps = ComponentPropsWithoutChildren<typeof PageSection> & {
  /** 表示するタスクの日付 */
  date: Date;
};

export const TodoMainTasks = ({ date, ...props }: TodoMainTasksProps) => {
  const currentDate = useCurrentDate({ timeResolution: 'day' });
  const isToday = isSameDay(date, currentDate);
  const { data: suggestedTasks } = $api.useSuspenseQuery(
    'get',
    '/suggested-tasks/today'
  );
  const { data, fetchNextPage, hasNextPage } = $api.useInfiniteQuery(
    'get',
    '/tasks',
    {
      params: {
        query: {
          ...filterTodayTasks(date),
          isCompleted_eq: false,
          sort: ['loadScore,desc', 'dueAt,asc', 'id,asc'],
          size: 6,
        },
      },
    },
    {
      pageParamName: 'page',
      initialPageParam: 0,
      getNextPageParam,
      suspense: true,
    }
  );
  return (
    <PageSection {...props}>
      <PageSectionTitle>主要なタスク</PageSectionTitle>
      <TaskHorizontalSmallStack
        suggestedTasks={isToday ? selectRandomOne(suggestedTasks) : []}
        tasks={data?.pages.flatMap((page) => page.content || []) || []}
      >
        {hasNextPage && (
          <Button
            size="lg"
            variant="secondary"
            className="h-auto"
            onClick={() => fetchNextPage()}
          >
            もっと見る
          </Button>
        )}
      </TaskHorizontalSmallStack>
    </PageSection>
  );
};
