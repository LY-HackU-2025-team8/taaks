import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Link } from '@tanstack/react-router';
import { format, isAfter, isBefore } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import type { TaskResponseModel } from '../api/task-model';

type TaskCardSummaryProps = ComponentPropsWithoutChildren<typeof Card> & {
  /** 情報を表示するタスク */
  task: TaskResponseModel;
};

export const TaskCardSummary = ({
  task: { id, dueAt, completedAt, title, memo },
  className,
  ...props
}: TaskCardSummaryProps) => {
  return (
    <Link to="/todo/$taskId" params={{ taskId: id }} className="contents">
      <Card className={cn('min-w-80 gap-1', className)} {...props}>
        <CardContent>
          <div className="flex items-center gap-2">
            <Heading
              variant="muted"
              className={cn({ 'line-through': !!completedAt })}
            >
              {format(new Date(dueAt), 'H:mm')}
            </Heading>
            {completedAt && (
              <Heading
                variant="muted"
                className={cn('flex items-center gap-1', {
                  'text-error': isBefore(
                    new Date(dueAt),
                    new Date(completedAt)
                  ),
                  'text-success': isAfter(
                    new Date(dueAt),
                    new Date(completedAt)
                  ),
                })}
              >
                <CheckIcon className="size-4" />
                {format(new Date(completedAt), 'H:mm')}
              </Heading>
            )}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-1">{memo}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
