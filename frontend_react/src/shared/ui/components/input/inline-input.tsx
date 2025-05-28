import { cn } from '@/shared/lib/utils';

/** @deprecated Inputのvariantに加える */
export const InlineInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return <input className={cn('focus:outline-none', className)} {...props} />;
};
