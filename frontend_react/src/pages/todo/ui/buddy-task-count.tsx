import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { filterToday } from '@/shared/api/filter-today';
import { $api } from '@/shared/api/openapi-fetch';

export type BuddyTaskCountProps = React.ComponentProps<'section'> & {
  date: Date;
};

export const BuddyTaskCount = ({ date, ...props }: BuddyTaskCountProps) => {
  const { data } = $api.useQuery('get', '/tasks', {
    params: {
      query: {
        ...filterToday(date),
      },
    },
  });
  const totalTasks = data?.totalElements || 0;
  return (
    <section {...props}>
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
    </section>
  );
};
