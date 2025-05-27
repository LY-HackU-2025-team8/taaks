import { filterToday } from '@/shared/api/filter-today';
import { $api } from '@/shared/api/openapi-fetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/ui/components/shadcn/card';

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
      <Card className="bg-custom text-custom-foreground border-none py-6 pr-40 shadow-none">
        <CardHeader className="grid-rows-1 px-6">
          <CardDescription className="text-inherit">
            Buddyからのメッセージ
          </CardDescription>
        </CardHeader>
        <CardContent className="font-line-seed flex flex-col justify-center px-6 text-lg font-bold break-keep">
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
        </CardContent>
      </Card>
    </section>
  );
};
