import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';

/** @deprecated もはやコンポーネント化する意味があまりないのでなくす */
export const ToolLinkButton = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => {
  return (
    <Button variant="custom" className={cn('h-12.5', className)} asChild>
      <Link {...props} />
    </Button>
  );
};
