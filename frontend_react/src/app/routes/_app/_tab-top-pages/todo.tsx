import { BuddyTaskCount } from '@/pages/todo/ui/buddy-task-count';
import { VerticalTaskList } from '@/pages/todo/ui/vertical-task-list';
import { refineDateFormat } from '@/shared/api/zod/refine-date-format';
import { DATE_DATA_FORMAT, DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { cn } from '@/shared/lib/utils';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { CalendarLarge } from '@/shared/ui/components/input/calendar-large';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format, isSameDay } from 'date-fns';
import { z } from 'zod';

const todoParamsSchema = z.object({
  date: z
    .string()
    .refine(refineDateFormat, {
      message: '日付は yyyy-MM-dd 形式で指定してください。',
    })
    .default(() => format(new Date(), DATE_DATA_FORMAT)),
});

export const Route = createFileRoute('/_app/_tab-top-pages/todo')({
  validateSearch: todoParamsSchema,
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const currentDate = useCurrentDate({ timeResolution: 'day' });
  const { date: dateStr } = Route.useSearch();
  const date = useMemo(() => new Date(dateStr), [dateStr]);

  const isToday = useMemo(
    () => isSameDay(date, currentDate),
    [date, currentDate]
  );

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
      <PageHeader className="bg-custom text-custom-foreground rounded-b-4xl pb-8">
        <PageTitleContainer>
          <PageTitle>Todo</PageTitle>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Button>
        </PageTitleContainer>
        <CalendarLarge
          mode="single"
          selected={date}
          onSelect={handleDateChange}
        />
      </PageHeader>
      <PageMain>
        <PageSection>
          <PageSectionTitle>
            {isToday ? '今日' : format(date, DATE_DISPLAY_FORMAT)}のタスク
          </PageSectionTitle>
          <VerticalTaskList date={date} />
        </PageSection>
        <BuddyTaskCount date={date} />
        <PageSection>
          <PageSectionTitle>
            {isToday ? '今日' : format(date, DATE_DISPLAY_FORMAT)}
            の完了したタスク
          </PageSectionTitle>
          <VerticalTaskList date={date} isCompleted />
        </PageSection>
      </PageMain>
    </>
  );
}
