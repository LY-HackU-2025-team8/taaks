import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
import { Skeleton } from '@/shared/ui/components/shadcn/skeleton';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { format } from 'date-fns';

type TodoBuddyTaskCountProps = ComponentPropsWithoutChildren<'section'> & {
  /** タスク数をカウントする日付 */
  date: Date;
};

/** 今日の残りタスク数を教えてくれるカード */
export const TodoBuddyTaskCount = ({
  date,
  className,
  ...props
}: TodoBuddyTaskCountProps) => {
  const { data } = $api.useSuspenseQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  /** 合計残りタスク数 */
  const totalTasks = data?.uncompletedTaskCount;
  return (
    <PageSection className={cn('px-0 pt-12', className)} {...props}>
      <BuddyMessageCard className="overflow-x-clip">
        <BuddyMessageCardHeader>
          <BuddyMessageCardDescription>
            Buddyからのメッセージ
          </BuddyMessageCardDescription>
        </BuddyMessageCardHeader>
        <BuddyMessageCardContent className="min-h-24 text-lg break-keep">
          {totalTasks === undefined ? (
            <Skeleton className="h-24 w-full" />
          ) : totalTasks ? (
            <>
              今日のタスクは
              <wbr />
              あと{totalTasks}件だよ。
              <wbr />
              頑張ってね！
            </>
          ) : (
            <>今日もお疲れ様！</>
          )}
        </BuddyMessageCardContent>
        <div className="absolute -right-4 bottom-0 size-64">
          <RiveBuddy motionId={1} faceId={6} />
        </div>
      </BuddyMessageCard>
    </PageSection>
  );
};
