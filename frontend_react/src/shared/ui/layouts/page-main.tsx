import { cn } from '@/shared/lib/utils';

type PageMainProps = React.ComponentProps<'main'>;

/** ページのメインコンテンツ */
export const PageMain = ({ className, ...props }: PageMainProps) => {
  return (
    <main
      className={cn(
        'flex flex-1 flex-col gap-7 py-7 pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]',
        className
      )}
      {...props}
    />
  );
};
