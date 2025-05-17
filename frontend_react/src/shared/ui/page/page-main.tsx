import { cn } from '@/shared/lib/utils';

export type PageMainProps = React.ComponentProps<'main'>;

export const PageMain = ({ className, ...props }: PageMainProps) => {
  return (
    <main
      className={cn(
        'flex flex-1 flex-col pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]',
        className
      )}
      {...props}
    />
  );
};
