import { TaskHorizontalSmallStack } from '@/entities/task/ui/task-horizontal-small-stack';
import { $api } from '@/shared/api/openapi-fetch';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Text } from '@/shared/ui/components/typography/text';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';

type DiarySuggestTasksProps = ComponentPropsWithoutChildren<
  typeof PageSection
> & {
  diaryId: number;
};

export const DiarySuggestTasks = ({
  diaryId,
  ...props
}: DiarySuggestTasksProps) => {
  const { data: suggestedTasks } = $api.useSuspenseQuery(
    'get',
    '/diaries/{id}/suggested-tasks',
    {
      params: {
        path: {
          id: diaryId,
        },
      },
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60 * 24, // 1 day
    }
  );

  return (
    <PageSection {...props}>
      <PageSectionTitle>明日はこれを頑張ってみよう！</PageSectionTitle>
      <TaskHorizontalSmallStack
        suggestedTasks={suggestedTasks}
        emptyText={
          <Text variant="muted">日記をもう少したくさん書いてみよう！</Text>
        }
      />
    </PageSection>
  );
};
