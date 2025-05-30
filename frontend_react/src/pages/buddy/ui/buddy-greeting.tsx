import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
import { Heading } from '@/shared/ui/components/typography/heading';

type BuddyGreetingProps = ComponentPropsWithoutChildren<'div'>;

export const BuddyGreeting = ({ className, ...props }: BuddyGreetingProps) => {
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="w-full">
        <RiveBuddy className="h-80 w-full mask-b-from-60% mask-b-to-90% mask-alpha" />
      </div>
      <Heading className="break-keep" size="4xl" variant="custom">
        おはよう
        <wbr />
        {buddy?.nickname}さん！
      </Heading>
    </div>
  );
};
