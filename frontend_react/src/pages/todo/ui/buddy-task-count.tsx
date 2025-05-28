import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { filterToday } from '@/shared/api/filter-today';
import { $api } from '@/shared/api/openapi-fetch';
import { cn } from '@/shared/lib/utils';
import { PageSection } from '@/shared/ui/layouts/page-section';

export type BuddyTaskCountProps = React.ComponentProps<'section'> & {
  /** タスク数をカウントする日付 */
  date: Date;
};

/** 今日の残りタスク数を教えてくれるカード */
export const BuddyTaskCount = ({
  date,
  className,
  ...props
}: BuddyTaskCountProps) => {
  const { data } = $api.useQuery('get', '/tasks', {
    params: {
      query: {
        ...filterToday(date),
        isCompleted_eq: false,
        sort: ['dueAt,asc'], // ここでソートは必要ないが、Tanstack Queryのキャッシュを活かすために設定
      },
    },
  });
  /** 合計残りタスク数 */
  const totalTasks = data?.totalElements || 0;
  return (
    <PageSection className={cn('px-0', className)} {...props}>
      <BuddyMessageCard>
        <BuddyMessageCardHeader>
          <BuddyMessageCardDescription>
            Buddyからのメッセージ
          </BuddyMessageCardDescription>
        </BuddyMessageCardHeader>
        <BuddyMessageCardContent className="text-lg break-keep">
          {totalTasks ? (
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
      </BuddyMessageCard>
    </PageSection>
  );
};
