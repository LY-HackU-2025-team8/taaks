import { cn } from '@/shared/lib/utils';

export const PageTitle = ({
  className,
  ...props
}: React.ComponentProps<'h1'>) => {
  return <h1 className={cn('text-[28px] font-bold', className)} {...props} />;
};
