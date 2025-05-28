import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { LoaderCircleIcon } from 'lucide-react';

type LoadingProps = ComponentPropsWithoutChildren<'div'>;

export const Loading = ({ className, ...props }: LoadingProps) => {
  return (
    <div
      className={cn('flex flex-1 items-center justify-center', className)}
      {...props}
    >
      <LoaderCircleIcon className="text-muted-foreground size-6 animate-spin" />
    </div>
  );
};
