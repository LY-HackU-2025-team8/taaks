import { TaskLoadScoreCard } from '@/features/task-load-score/ui/task-load-score-card';
import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { Card, CardContent } from '@/shared/ui/components/shadcn/card';
import { Heading } from '@/shared/ui/components/typography/heading';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';

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
      <TaskLoadScoreCard
        loadScore={stats.loadScore || 0}
        variant="primary-invert"
      />
      <div className="flex gap-3.5">
        <Card className="bg-primary text-primary-foreground flex-1">
          <CardContent>
            <Heading size="sm">今日のタスク数</Heading>
            <Heading size="xl" className="text-right">
              {stats.taskCount}
            </Heading>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground flex-1">
          <CardContent>
            <Heading size="sm">完了したタスク数</Heading>
            <Heading size="xl" className="text-right">
              {stats.completedTaskCount}
            </Heading>
          </CardContent>
        </Card>
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
