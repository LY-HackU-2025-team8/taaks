import { EditTaskDrawer } from '@/features/edit-task/edit-task-drawer';
import { $api } from '@/shared/api/openapi-fetch';
import { ClockIcon } from '@/shared/ui/components/icons/clock-icon';
import { CloseIcon } from '@/shared/ui/components/icons/close-icon';
import { EditIcon } from '@/shared/ui/components/icons/edit-icon';
import { BackButton } from '@/shared/ui/components/router/back-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Text } from '@/shared/ui/components/typography/text';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';

const paramsSchema = z.object({
  taskId: z.coerce.number(),
});

export const Route = createFileRoute('/_app/todo/$taskId')({
  params: paramsSchema,
  loader: async ({ params: { taskId }, context: { queryClient } }) => ({
    task: await queryClient.ensureQueryData(
      $api.queryOptions('get', '/tasks/{taskId}', {
        params: { path: { taskId } },
      })
    ),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { task } = Route.useLoaderData();
  return (
    <>
      <PageHeader>
        <PageTitleContainer className="flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <BackButton>
              <CloseIcon />
            </BackButton>
          </Button>
          <EditTaskDrawer task={task}>
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </EditTaskDrawer>
        </PageTitleContainer>
      </PageHeader>
      <PageMain>
        <PageSection className="">
          <Heading className="text-2xl" asChild>
            <h1>{task.title}</h1>
          </Heading>
          <Text variant="muted" className="text-sm">
            {task.memo || 'このタスクにメモはありません。'}
          </Text>
        </PageSection>
        <PageSection>
          <ul>
            <li className="flex items-center gap-3">
              <ClockIcon />
              <Text variant="muted" className="font-line-seed font-bold">
                {task.dueAt && format(new Date(task.dueAt), 'M/dd HH:mm')}
              </Text>
            </li>
          </ul>
        </PageSection>
        <Separator />
        <PageSection>
          <Heading asChild>
            <div className="flex items-center gap-2">
              <h2>負荷スコア</h2>
              <Text className="text-sm" asChild>
                <span>by Taaks intelligence</span>
              </Text>
            </div>
          </Heading>
          <Text className="font-line-seed text-4xl font-bold">
            {task.loadScore}
          </Text>
          <Text variant="muted" className="text-xs">
            ※ 負荷スコアは10点満点です。
            <br />※
            負荷スコアはAIによる予測スコアであり、実際に感じる負荷とは異なる場合があります。その場合は、手動で負荷スコアを調整してください。
          </Text>
        </PageSection>
      </PageMain>
    </>
  );
}
