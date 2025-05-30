import { TASK_CARD_SMALL_PATH } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { RiveCheckButton } from '@/shared/ui/components/rive/rive-check-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { useCallback, useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { SuggestedTaskResponseModel } from '../api/suggested-task-model';
import { taskFormSchema } from '../api/task-form-schema';
import type { TaskResponseModel } from '../api/task-model';
import { useCreateTask } from '../api/use-create-task';

type TaskCardSmallBuddyProps = ComponentPropsWithoutChildren<typeof Card> & {
  task: SuggestedTaskResponseModel;
};

/** Buddyからサジェストされたタスクが表示されるカード */
export const TaskCardSmallBuddy = ({
  task,
  className,
  ...props
}: TaskCardSmallBuddyProps) => {
  const { createTask, isPending } = useCreateTask();
  const [added, setAdded] = useState(false);
  const [createdTask, setCreatedTask] = useState<TaskResponseModel>();

  /** タスクを追加する */
  const handleAdd = useCallback(() => {
    setAdded(true);
    createTask(
      taskFormSchema.parse({
        ...task,
        memo: '',
        completedAt: null,
        isAllDay: false,
      }),
      {
        mutateOptions: {
          onSuccess: (task) => {
            setCreatedTask(task);
          },
        },
      }
    );
  }, [createTask, task]);

  return (
    <div
      data-slot="task-card-small-buddy-wrapper"
      className={cn('relative flex h-38.75 w-44.75', className)}
      {...props}
    >
      <Card
        className="from-buddy-gradient-from via-buddy-gradient-via to-buddy-gradient-end relative h-38.75 w-44.75 bg-gradient-to-br [&_button]:relative [&_button]:z-1"
        style={{
          clipPath: `path("${TASK_CARD_SMALL_PATH}")`,
        }}
      >
        {createdTask && (
          <Link
            to="/todo/$taskId"
            params={{ taskId: createdTask.id }}
            className="absolute inset-0"
          />
        )}
        <CardHeader>
          <CardDescription className="font-line-seed text-primary-foreground w-20 text-sm font-bold break-keep">
            Buddyからの
            <wbr />
            おすすめ
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <Heading variant="primary" className="line-clamp-3">
            {task.title}
          </Heading>
        </CardContent>
      </Card>

      {/* 右上のボタン */}
      <button
        type="button"
        className="absolute top-0 right-0 h-11.25 w-13.25"
        disabled={isPending || added}
        onClick={handleAdd}
      >
        <RiveCheckButton className="h-full w-full" type="buddy" done={added} />
      </button>
    </div>
  );
};
