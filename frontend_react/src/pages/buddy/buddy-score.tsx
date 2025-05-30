import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { CardContent } from '@/shared/ui/components/shadcn/card';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';
import { BuddyTaskLoadScore } from '@/pages/buddy/buddy-task-load-score';

export const BuddyScore = () => {
  const date = useCurrentDate({ timeResolution: 'day' });
  const { data: stats } = $api.useSuspenseQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });

  return (
    <PageSection>
      <PageSectionTitle>今日のスコア</PageSectionTitle>

      <BuddyTaskLoadScore />

      <div className="flex flex-row gap-3.5 text-primary-foreground">
        <CardContent className="bg-primary flex flex-1 flex-col gap-2 rounded-lg p-3.5">
          <p className="text-[13px] font-bold">今日のタスク数</p>
          <p className="text-md text-right text-xl">{stats.taskCount}</p>
        </CardContent>
        <CardContent className="bg-primary flex flex-1 flex-col gap-2 rounded-lg p-3.5">
          <p className="text-[13px] font-bold">完了したタスク数</p>
          <p className="text-md text-right text-xl">
            {stats.completedTaskCount}
          </p>
        </CardContent>
      </div>

      {/* TODO: 累計タスク完了数を返すAPIが出来上がったらコメントアウト外す */}
      {/* <CardContent className="bg-primary text-primary-foreground flex flex-col gap-2 rounded-lg p-3.5">
        <p className="text-[13px] font-bold">今までの累計タスク完了数</p>
        <p className="text-md text-right text-xl">
          {stats.completedTaskCount}
        </p>
      </CardContent> */}
    </PageSection>
  );
};
