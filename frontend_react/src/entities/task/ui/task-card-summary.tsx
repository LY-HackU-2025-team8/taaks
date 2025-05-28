import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import {
  Card,
  CardDescription,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';
import { format } from 'date-fns';
import type { TaskResponseModel } from '../api/task-model';

type TaskCardSummaryProps = ComponentPropsWithoutChildren<typeof Card> & {
  /** 情報を表示するタスク */
  task: TaskResponseModel;
};

export const TaskCardSummary = ({
  task: { dueAt, title },
  className,
  ...props
}: TaskCardSummaryProps) => {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardDescription>{format(new Date(dueAt), 'H:mm')}</CardDescription>
        <CardHeader>{title}</CardHeader>
      </CardHeader>
    </Card>
  );
};
