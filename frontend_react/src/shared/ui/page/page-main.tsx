import { cn } from '@/shared/lib/utils';

export type PageMainProps = React.ComponentProps<'main'>;

export const PageMain = ({ className, ...props }: PageMainProps) => {
  return (
    <main
      className={cn(
        'mr-[env(safe-area-inset-right)] ml-[env(safe-area-inset-left)] p-3.5',
        className
      )}
      {...props}
    />
  );
};
