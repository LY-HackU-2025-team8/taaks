import { TaskCardSkeleton } from '@/entities/task/ui/task-card-skeleton';
import { TaskVerticalStack } from '@/entities/task/ui/task-vertical-stack';
import { filterToday } from '@/shared/api/filter-today';
import { getNextPageParam } from '@/shared/api/get-next-page-param';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
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
  const { data, isLoading } = $api.useInfiniteQuery(
    'get',
    '/tasks',
    {
      params: {
        query: {
          ...filterToday(date),
          isCompleted_eq: true,
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

  const isToday = isSameDay(date, currentDate);
  const tasks = data?.pages.flatMap((page) => page.content || []) || [];

  return (
    <PageSection {...props}>
      <PageSectionTitle>
        {isToday ? '今日' : format(date, DATE_DISPLAY_FORMAT)}の完了済みタスク
      </PageSectionTitle>
      {isLoading ? (
        [...Array(10)].map((_, i) => <TaskCardSkeleton key={i} />)
      ) : !tasks.length ? (
        <Text variant="muted">完了済みのタスクはありません</Text>
      ) : (
        <TaskVerticalStack tasks={tasks} />
      )}
    </PageSection>
  );
};
