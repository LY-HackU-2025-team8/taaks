import { EditTaskDrawer } from '@/features/edit-task/edit-task-drawer';
import { cn } from '@/shared/lib/utils';
import { CheckIconSmall } from '@/shared/ui/components/icons/check-icon-small';
import { EditIconSmall } from '@/shared/ui/components/icons/edit-icon-small';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import type { TaskResponseModel } from '../api/task-model';

export type TaskCardLargeProps = React.ComponentProps<'div'> & {
  task: TaskResponseModel;
};

export const TaskCardLarge = ({
  task,
  className,
  ...props
}: TaskCardLargeProps) => {
  return (
    <Card
      className={cn(
        'relative pl-16 [&_button]:relative [&_button]:z-1',
        className
      )}
      {...props}
    >
      <div className="font-line-seed absolute top-3.5 bottom-3.5 left-3.5 flex w-12 flex-col items-end border-r pr-3.5 text-2xl font-bold">
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
      <CardHeader className="gap-4">
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.memo}</CardDescription>
      </CardHeader>
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
        >
          <CheckIconSmall />
        </Button>
      </CardFooter>
    </Card>
  );
};
