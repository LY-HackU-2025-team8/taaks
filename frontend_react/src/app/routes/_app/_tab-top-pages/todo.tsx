import { BuddyTaskCount } from '@/pages/todo/ui/buddy-task-count';
import { VerticalTaskList } from '@/pages/todo/ui/vertical-task-list';
import { refineDateFormat } from '@/shared/api/zod/refine-date-format';
import { DATE_FORMAT, INTERNAL_DATE_FORMAT } from '@/shared/constant';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { cn } from '@/shared/lib/utils';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { CalendarLarge } from '@/shared/ui/components/input/calendar-large';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/page/page-header';
import { PageMain } from '@/shared/ui/page/page-main';
import { PageSection } from '@/shared/ui/page/page-section';
import { PageSectionTitle } from '@/shared/ui/page/page-section-title';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { z } from 'zod';

const todoParamsSchema = z.object({
  date: z
    .string()
    .refine(refineDateFormat, {
      message: '日付は yyyy-MM-dd 形式で指定してください。',
    })
    .default(() => format(new Date(), INTERNAL_DATE_FORMAT)),
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
    () =>
      date.getUTCFullYear() === currentDate.getUTCFullYear() &&
      date.getUTCMonth() === currentDate.getUTCMonth() &&
      date.getUTCDate() === currentDate.getUTCDate(),
    [date, currentDate]
  );

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate)
      navigate({
        to: '.',
        search: { date: format(newDate, INTERNAL_DATE_FORMAT) },
        replace: true,
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
            {isToday ? '今日' : format(date, DATE_FORMAT)}のタスク
          </PageSectionTitle>
          <VerticalTaskList date={date} />
        </PageSection>
        <BuddyTaskCount date={date} />
      </PageMain>
    </>
  );
}
