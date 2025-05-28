import { cn } from '@/shared/lib/utils';

type PageHeaderProps = React.ComponentProps<'div'>;

/** ページ全体のヘッダ */
export const PageHeader = ({ className, ...props }: PageHeaderProps) => {
  return (
    <header
      className={cn(
        'pt-[env(safe-area-inset-top)] pr-[calc(env(safe-area-inset-right)+0.875rem)] pl-[calc(env(safe-area-inset-left)+0.875rem)]',
        className
      )}
      {...props}
    />
  );
};
