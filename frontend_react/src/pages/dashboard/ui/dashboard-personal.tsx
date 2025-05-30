import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { CardContent } from '@/shared/ui/components/shadcn/card';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { format } from 'date-fns';
import { useCurrentDate } from '@/shared/hooks/use-current-date';

export const DashboardPersonal = () => {
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
      <PageSectionTitle>パーソナル</PageSectionTitle>
      <div className="flex flex-row gap-3.5">
        <CardContent className="bg-card flex flex-1 flex-col gap-2 rounded-lg p-3.5">
          <p className="text-[13px] font-bold">今日のタスク数</p>
          <p className="text-md text-right text-xl">{stats.taskCount}</p>
        </CardContent>
        <CardContent className="bg-card flex flex-1 flex-col gap-2 rounded-lg p-3.5">
          <p className="text-[13px] font-bold">完了したタスク数</p>
          <p className="text-md text-right text-xl">
            {stats.completedTaskCount}
          </p>
        </CardContent>
      </div>
    </PageSection>
  );
};
