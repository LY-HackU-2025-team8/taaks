import { EditTaskDrawer } from '@/features/edit-task/edit-task-drawer';
import { cn } from '@/shared/lib/utils';
import { BackIconSmall } from '@/shared/ui/components/icons/back-icon-small';
import { CheckIconSmall } from '@/shared/ui/components/icons/check-icon-small';
import { EditIconSmall } from '@/shared/ui/components/icons/edit-icon-small';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/shadcn/card';
import { Text } from '@/shared/ui/components/typography/text';
import { useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';
import { taskFormSchema } from '../api/task-form-schema';
import type { TaskResponseModel } from '../api/task-model';
import { useEditTask } from '../api/use-edit-task';

export type TaskCardLargeProps = React.ComponentProps<'div'> & {
  task: TaskResponseModel;
};

export const TaskCardLarge = ({
  task,
  className,
  ...props
}: TaskCardLargeProps) => {
  const { editTask, isPending } = useEditTask(z.number().parse(task.id));

  const handleComplete = useCallback(() => {
    editTask()(
      taskFormSchema.parse({
        ...task,
        completedAt: new Date(),
      })
    );
  }, [editTask, task]);

  const handleUndo = useCallback(() => {
    editTask()(
      taskFormSchema.parse({
        ...task,
        completedAt: undefined,
      })
    );
  }, [editTask, task]);

  const isCompleted = !!task.completedAt;

  return (
    <Card
      className={cn(
        'relative rounded-2xl pl-16 [&_button]:relative [&_button]:z-1',
        className
      )}
      {...props}
    >
      <div className="font-line-seed text-foreground absolute top-3.5 bottom-3.5 left-0 flex w-16 flex-col items-end border-r px-3.5 text-xl font-bold">
        <span>{format(new Date(task.dueAt || new Date()), 'HH')}</span>
        <span>{format(new Date(task.dueAt || new Date()), 'mm')}</span>
      </div>
      {task.id && (
        <Link
          to="/todo/$taskId"
          params={{ taskId: task.id }}
          className="absolute inset-0 z-0"
        />
      )}
      <CardHeader className="grid-rows-1">
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="muted" className="line-clamp-2 h-9 text-sm">
          {task.memo}
        </Text>
      </CardContent>
      <CardFooter className="justify-end gap-1.5">
        <EditTaskDrawer task={task}>
          <Button
            variant="outline"
            size="icon-sm"
            className="border-card-foreground text-card-foreground"
          >
            <EditIconSmall />
          </Button>
        </EditTaskDrawer>
        <Button
          variant="outline"
          size="icon-sm"
          className="border-card-foreground text-card-foreground"
          disabled={isPending}
          onClick={isCompleted ? handleUndo : handleComplete}
        >
          {isCompleted ? <BackIconSmall /> : <CheckIconSmall />}
        </Button>
      </CardFooter>
    </Card>
  );
};
