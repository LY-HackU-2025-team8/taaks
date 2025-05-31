import { cn } from '@/shared/lib/utils';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary ring-primary relative h-3 w-full overflow-hidden rounded-full ring-6',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary-foreground h-full w-full flex-1 rounded-full transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
