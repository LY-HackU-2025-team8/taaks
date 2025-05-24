import { cn } from '@/shared/lib/utils';
import { EditIcon } from '@/shared/ui/components/icons/edit-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/shadcn/card';
import { format } from 'date-fns';
import { LucideCheck } from 'lucide-react';
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
    <Card className={cn('relative pl-16', className)} {...props}>
      <div className="font-line-seed absolute top-3.5 bottom-3.5 left-3.5 flex w-12 flex-col items-end border-r pr-3.5 text-2xl font-bold">
        <span>{format(new Date(task.dueAt || new Date()), 'HH')}</span>
        <span>{format(new Date(task.dueAt || new Date()), 'mm')}</span>
      </div>
      <CardHeader className="gap-4">
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.memo}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end gap-1.5">
        <Button
          variant="outline"
          size="icon-sm"
          className="border-card-foreground text-card-foreground"
        >
          <EditIcon />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          className="border-card-foreground text-card-foreground"
        >
          <LucideCheck />
        </Button>
      </CardFooter>
    </Card>
  );
};
