import { TaskVerticalStack } from '@/entities/task/ui/task-vertical-stack';
import { filterTodayTasks } from '@/shared/api/filter-today';
import { getNextPageParam } from '@/shared/api/get-next-page-param';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Text } from '@/shared/ui/components/typography/text';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format, isSameDay } from 'date-fns';

type TodoCompletedTasksProps = ComponentPropsWithoutChildren<
  typeof PageSection
> & {
  /** 表示するタスクの日付 */
  date: Date;
};

/**
 * 未完了タスクのリスト
 */
export const TodoCompletedTasks = ({
  date,
  ...props
}: TodoCompletedTasksProps) => {
  const currentDate = useCurrentDate({ timeResolution: 'day' });
  const { data, fetchNextPage, hasNextPage } = $api.useInfiniteQuery(
    'get',
    '/tasks',
    {
      params: {
        query: {
          ...filterTodayTasks(date),
          isCompleted_eq: true,
          sort: ['dueAt,asc', 'id,asc'],
          size: 6, // 一度に取得するタスクの数
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

  const isToday = isSameDay(date, currentDate);
  const tasks = data?.pages.flatMap((page) => page.content || []) || [];

  return (
    <PageSection {...props}>
      <PageSectionTitle>
        {isToday ? '今日' : format(date, DATE_DISPLAY_FORMAT)}の完了済みタスク
      </PageSectionTitle>
      {!tasks.length ? (
        <Text variant="muted">タスクはありません</Text>
      ) : (
        <TaskVerticalStack tasks={tasks}>
          {hasNextPage && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => fetchNextPage()}
            >
              もっと見る
            </Button>
          )}
        </TaskVerticalStack>
      )}
    </PageSection>
  );
};
