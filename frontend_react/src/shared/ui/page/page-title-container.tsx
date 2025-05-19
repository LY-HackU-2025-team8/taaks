import { cn } from '@/shared/lib/utils';

export const PageTitleContainer = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex items-center py-3.5', className)} {...props} />
  );
};
