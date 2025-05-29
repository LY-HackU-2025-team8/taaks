import { BuddySuggestAddTask } from '@/entities/buddy/ui/buddy-suggest-add-task';
import { TaskHorizontalStack } from '@/entities/task/ui/task-horizontal-stack';
import { filterToday } from '@/shared/api/filter-today';
import { getNextPageParam } from '@/shared/api/get-next-page-param';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';

type DiarySummaryProps = ComponentPropsWithoutChildren<typeof PageSection> & {
  /** Summaryを表示する日付 */
  date: Date;
};

/** 日記ページの今日のサマリー */
export const DiarySummary = ({ date, ...props }: DiarySummaryProps) => {
  const { data } = $api.useInfiniteQuery(
    'get',
    '/tasks',
    {
      params: {
        query: {
          ...filterToday(date),
          sort: ['dueAt,asc'],
        },
      },
    },
    {
      pageParamName: 'page',
      initialPageParam: 0,
      getNextPageParam,
    }
  );

  return (
    <PageSection {...props}>
      <PageSectionTitle>
        {format(date, DATE_DISPLAY_FORMAT)}のサマリー
      </PageSectionTitle>
      <TaskHorizontalStack
        tasks={data?.pages.flatMap((page) => page.content || []) || []}
      />
      <BuddySuggestAddTask buttonText="明日のタスクを追加する">
        もしまだ余裕があれば
        <wbr />
        明日やることを
        <wbr />
        整理してみませんか？
      </BuddySuggestAddTask>
    </PageSection>
  );
};
