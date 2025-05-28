import { BuddySuggestTask } from '@/pages/diary/ui/buddy-suggest-task';
import { NoDiaryCard } from '@/pages/diary/ui/no-diary-card';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { CalendarLarge } from '@/shared/ui/components/input/calendar-large';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/diary')({
  component: RouteComponent,
});

function RouteComponent() {
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
          <CalendarLarge mode="single" />
        </div>
      </PageHeader>
      <PageMain>
        <NoDiaryCard date={new Date()} />
        <BuddySuggestTask />
      </PageMain>
    </>
  );
}
