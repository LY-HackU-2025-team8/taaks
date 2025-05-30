import { BuddySuggestAddTask } from '@/entities/buddy/ui/buddy-suggest-add-task';
import { TaskHorizontalSummaryStack } from '@/entities/task/ui/task-horizontal-summary-stack';
import { filterTodayTasks } from '@/shared/api/filter-today';
import { getNextPageParam } from '@/shared/api/get-next-page-param';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';

type DiarySummaryProps = ComponentPropsWithoutChildren<typeof PageSection> & {
  /** Summaryを表示する日付 */
  date: Date;
  /** Buddyからの提案カードを表示するか */
  showSuggestAddTask?: boolean;
};

/** 日記ページの今日のサマリー */
export const DiarySummary = ({
  date,
  showSuggestAddTask,
  ...props
}: DiarySummaryProps) => {
  const { data, hasNextPage, fetchNextPage } = $api.useInfiniteQuery(
    'get',
    '/tasks',
    {
      params: {
        query: {
          ...filterTodayTasks(date),
          sort: ['dueAt,asc', 'id,asc'],
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
      <PageSectionTitle>
        {format(date, DATE_DISPLAY_FORMAT)}のサマリー
      </PageSectionTitle>
      <TaskHorizontalSummaryStack
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
      </TaskHorizontalSummaryStack>
      {showSuggestAddTask && (
        <BuddySuggestAddTask buttonText="明日のタスクを追加する">
          もしまだ余裕があれば
          <wbr />
          明日やることを
          <wbr />
          整理してみませんか？
        </BuddySuggestAddTask>
      )}
    </PageSection>
  );
};
