import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type PageSectionProps = React.ComponentProps<'section'> & {
  asChild?: boolean;
};

/** メインコンテンツ内のセクション */
export const PageSection = ({
  className,
  asChild,
  ...props
}: PageSectionProps) => {
  const Comp = asChild ? Slot : 'section';

  return <Comp className={cn('space-y-3.5 px-3.5', className)} {...props} />;
};
