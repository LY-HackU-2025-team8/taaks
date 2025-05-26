import { VerticalTaskList } from '@/pages/todo/vertical-task-list';
import { CalendarLarge } from '@/shared/ui/components/input/calendar-large';
import { PageHeader } from '@/shared/ui/page/page-header';
import { PageMain } from '@/shared/ui/page/page-main';
import { PageSection } from '@/shared/ui/page/page-section';
import { PageSectionTitle } from '@/shared/ui/page/page-section-title';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/todo')({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) setDate(newDate);
  };

  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-4xl pb-8">
        <PageTitleContainer>
          <PageTitle>Todo</PageTitle>
        </PageTitleContainer>
        <CalendarLarge
          mode="single"
          selected={date}
          onSelect={handleDateChange}
        />
      </PageHeader>
      <PageMain>
        <PageSection>
          <PageSectionTitle>今日のタスク</PageSectionTitle>
          <VerticalTaskList date={date} />
        </PageSection>
      </PageMain>
    </>
  );
}
