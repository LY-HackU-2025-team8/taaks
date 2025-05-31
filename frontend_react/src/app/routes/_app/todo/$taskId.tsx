import { useDeleteTask } from '@/entities/task/api/use-delete-task';
import { useEditTask } from '@/entities/task/api/use-edit-task';
import { EditTaskDrawer } from '@/entities/task/ui/edit-task-drawer';
import { $api } from '@/shared/api/openapi-fetch';
import { BackIconSmall } from '@/shared/ui/components/icons/back-icon-small';
import { CheckIconSmall } from '@/shared/ui/components/icons/check-icon-small';
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
import { useCallback } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Trash2Icon } from 'lucide-react';
import { z } from 'zod';

const paramsSchema = z.object({
  taskId: z.coerce.number(),
});

export const Route = createFileRoute('/_app/todo/$taskId')({
  params: paramsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { taskId } = Route.useParams();
  const { data: task } = $api.useSuspenseQuery('get', '/tasks/{taskId}', {
    params: {
      path: { taskId: taskId },
    },
  });
  const { deleteTask } = useDeleteTask(task);
  const { handleCompleteTask, handleUnCompleteTask } = useEditTask(task);
  const isCompleted = !!task.completedAt;

  const handleDeleteTask = useCallback(() => {
    deleteTask({
      mutateOptions: {
        onSuccess: () => {
          navigate({
            to: '/todo',
          });
        },
      },
    });
  }, [deleteTask, navigate]);

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
        <PageSection className="flex-1">
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
        <footer className="flex gap-3.5 px-3.5">
          <Button
            className="flex-1"
            variant="destructive"
            onClick={handleDeleteTask}
          >
            <Trash2Icon />
            タスクを削除
          </Button>
          <Button
            className="flex-1"
            variant={isCompleted ? 'outline' : 'primary'}
            onClick={isCompleted ? handleUnCompleteTask : handleCompleteTask}
          >
            {isCompleted ? <BackIconSmall /> : <CheckIconSmall />}
            タスクを{isCompleted ? '未完了' : '完了'}
          </Button>
        </footer>
      </PageMain>
    </>
  );
}
