import { TaskCardLarge } from '@/entities/task/ui/task-card-large';
import { TaskCardSkeleton } from '@/entities/task/ui/task-card-skeleton';
import { filterToday } from '@/shared/api/filter-today';
import { $api } from '@/shared/api/openapi-fetch';
import { Text } from '@/shared/ui/components/typography/text';

export type VerticalTaskListProps = React.ComponentProps<'div'> & {
  /** 表示するタスクの日付 */
  date: Date;
  /** trueなら完了したタスクを表示する */
  isCompleted?: boolean;
};

/**
 * 縦に並ぶタスクのリスト
 * 自動的に期限でソートされる
 */
export const VerticalTaskList = ({
  date,
  isCompleted = false,
  ...props
}: VerticalTaskListProps) => {
  const { data: tasks, isLoading } = $api.useQuery('get', '/tasks', {
    params: {
      query: {
        ...filterToday(date),
        isCompleted_eq: isCompleted,
        sort: ['dueAt,asc'],
      },
    },
  });

  return (
    <div className="flex flex-col gap-3.5" {...props}>
      {isLoading ? (
        [...Array(10)].map((_, i) => <TaskCardSkeleton key={i} />)
      ) : tasks?.content?.length === 0 ? (
        <Text variant="muted">タスクはありません</Text>
      ) : (
        tasks?.content?.map((task) => (
          <TaskCardLarge key={task.id} task={task} />
        ))
      )}
    </div>
  );
};
