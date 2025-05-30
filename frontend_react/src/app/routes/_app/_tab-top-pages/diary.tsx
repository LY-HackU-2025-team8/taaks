import { DiaryContentCard } from '@/pages/diary/ui/diary-content-card';
import { DiarySummary } from '@/pages/diary/ui/diary-summary';
import { refineDateFormat } from '@/shared/api/zod/refine-date-format';
import { DATE_DATA_FORMAT } from '@/shared/constants';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { CalendarLarge } from '@/shared/ui/components/input/calendar-large';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Loading } from '@/shared/ui/layouts/loading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { Suspense, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';

const diaryParamsSchema = z.object({
  date: z
    .string()
    .refine(refineDateFormat, {
      message: '日付は yyyy-MM-dd 形式で指定してください。',
    })
    .default(() => format(new Date(), DATE_DATA_FORMAT)),
});

export const Route = createFileRoute('/_app/_tab-top-pages/diary')({
  validateSearch: diaryParamsSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { date: dateStr } = Route.useSearch();
  const date = useMemo(() => new Date(dateStr), [dateStr]);

  const handleDateChange = (newDate: Date | undefined) => {
    // カレンダー上で同じ日付をクリックした時にundefinedが来る（選択解除される）のをキャンセルする
    if (newDate)
      // クエリパラメータで日付を管理
      navigate({
        to: '.',
        search: { date: format(newDate, DATE_DATA_FORMAT) },
        replace: true, // 履歴に残さない
      });
  };

  return (
    <>
      <PageHeader>
        <PageTitleContainer>
          <PageTitle>Diary</PageTitle>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Button>
        </PageTitleContainer>
        <div className="bg-custom text-custom-foreground mt-2 rounded-xl p-3.5">
          <CalendarLarge
            selected={date}
            onSelect={handleDateChange}
            mode="single"
          />
        </div>
      </PageHeader>
      <PageMain>
        <Suspense fallback={<Loading />}>
          <DiaryContentCard date={date} />
          <DiarySummary date={date} showSuggestAddTask />
        </Suspense>
      </PageMain>
    </>
  );
}
