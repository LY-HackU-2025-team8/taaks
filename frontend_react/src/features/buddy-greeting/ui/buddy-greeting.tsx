import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';

type BuddyGreetingProps = React.ComponentProps<'div'> & {
  buddyFaceId?: number;
};

export const BuddyGreeting = ({
  className,
  children,
  buddyFaceId,
  ...props
}: BuddyGreetingProps) => {
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');

  return (
    <div className={cn('w-full', className)} {...props}>
      <RiveBuddy
        className="pointer-events-none -mt-10 h-80 w-full mask-b-from-60% mask-b-to-90% mask-alpha"
        clothesId={buddy?.clothesId}
        hairId={buddy?.hairStyleId}
        faceId={buddyFaceId}
      />
      {children}
    </div>
  );
};
