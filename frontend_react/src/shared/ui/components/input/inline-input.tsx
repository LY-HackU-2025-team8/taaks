import { cn } from '@/shared/lib/utils';

export const InlineInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return <input className={cn('focus:outline-none', className)} {...props} />;
};
