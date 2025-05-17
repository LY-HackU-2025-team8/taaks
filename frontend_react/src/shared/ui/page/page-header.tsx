import { cn } from '@/shared/lib/utils';

export type PageHeaderProps = React.ComponentProps<'div'>;

export const PageHeader = ({ className, ...props }: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]',
        className
      )}
      {...props}
    />
  );
};
