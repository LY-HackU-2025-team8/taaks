import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';
import { Skeleton } from '@/shared/ui/components/shadcn/skeleton';

export const TaskCardSkeleton = ({
  className,
  ...props
}: React.ComponentProps<typeof Card>) => {
  return (
    <Card className={cn('relative rounded-2xl pl-16', className)} {...props}>
      <div className="absolute top-3.5 bottom-3.5 left-0 flex w-16 flex-col items-end border-r px-3.5">
        <Skeleton className="h-18 w-9" />
      </div>
      <CardHeader className="grid-rows-1">
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-full" />
      </CardContent>
      <CardFooter className="justify-end gap-1.5">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
      </CardFooter>
    </Card>
  );
};
