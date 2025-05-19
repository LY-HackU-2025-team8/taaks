import { cn } from '@/shared/lib/utils';
import { Link } from '@tanstack/react-router';

export const ToolLink = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      className={cn(
        'bg-card/30 border-card flex h-12.5 items-center rounded-full border px-4 font-bold',
        className
      )}
      {...props}
    />
  );
};
