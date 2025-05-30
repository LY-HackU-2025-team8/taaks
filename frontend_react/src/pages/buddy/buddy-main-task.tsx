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

type BuddyMainTaskProps = ComponentPropsWithoutChildren<typeof PageSection>;

export const BuddyMainTask = ({ ...props }: BuddyMainTaskProps) => {
  const date = useCurrentDate({ timeResolution: 'day' });
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
      <PageSectionTitle>重要そうなタスクをマークしたよ</PageSectionTitle>
      <TaskHorizontalSmallStack
        suggestedTasks={selectRandomOne(suggestedTasks)}
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
