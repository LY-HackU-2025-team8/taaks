import { TASK_CARD_SMALL_PATH } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { EditIconSmall } from '@/shared/ui/components/icons/edit-icon-small';
import { RiveCheckButton } from '@/shared/ui/components/rive/rive-check-button';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { useCallback, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { taskFormSchema } from '../api/task-form-schema';
import type { TaskResponseModel } from '../api/task-model';
import { useEditTask } from '../api/use-edit-task';
import { EditTaskDrawer } from './edit-task-drawer';

type TaskCardSmallProps = ComponentPropsWithoutChildren<typeof Card> & {
  task: TaskResponseModel;
};

/** タスクを横並びで複数表示するためのカード */
export const TaskCardSmall = ({
  task,
  className,
  ...props
}: TaskCardSmallProps) => {
  const { editTask, isPending } = useEditTask(task.id);
  const [done, setDone] = useState(!!task.completedAt);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** タスクを完了する */
  const handleComplete = useCallback(() => {
    setDone(true);
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => {
      // アニメーションのために遅延させる
      editTask()(
        taskFormSchema.parse({
          ...task,
          completedAt: new Date(),
        })
      );
      timeoutRef.current = null;
    }, 1500);
  }, [editTask, task]);

  /** タスクの完了を取り消す */
  const handleUndo = useCallback(() => {
    setDone(false);
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => {
      editTask()(
        taskFormSchema.parse({
          ...task,
          completedAt: null,
        })
      );
      timeoutRef.current = null;
    }, 1500);
  }, [editTask, task]);

  return (
    <div
      data-slot="task-card-small-wrapper"
      className={cn('relative flex h-38.75 w-44.75', className)}
      {...props}
    >
      <Card
        className="relative h-38.75 w-44.75 pt-5 [&_button]:relative [&_button]:z-1"
        style={{
          clipPath: `path("${TASK_CARD_SMALL_PATH}")`,
        }}
      >
        <Link
          to="/todo/$taskId"
          params={{ taskId: task.id }}
          className="absolute inset-0"
        />
        <CardHeader>
          <CardDescription className="font-line-seed text-sm font-bold">
            {format(new Date(task.dueAt), 'H:mm')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <Heading>{task.title}</Heading>
        </CardContent>
        <CardFooter className="justify-between">
          <Heading variant="muted" size="sm">
            負荷スコア {task.loadScore}
          </Heading>
          <EditTaskDrawer task={task}>
            <Button size="icon-sm" variant="outline">
              <EditIconSmall />
            </Button>
          </EditTaskDrawer>
        </CardFooter>
      </Card>

      {/* 右上のボタン */}
      <button
        type="button"
        className="absolute top-0 right-0 h-11.25 w-13.25"
        disabled={timeoutRef.current !== null || isPending}
        onClick={done ? handleUndo : handleComplete}
      >
        <RiveCheckButton className="h-full w-full" type="todo" done={done} />
      </button>
    </div>
  );
};
