import { DashboardBuddy } from '@/pages/dashboard/ui/dashboard-buddy';
import { DashboardBuddySuggestion } from '@/pages/dashboard/ui/dashboard-buddy-suggestion';
import { DashboardMainTask } from '@/pages/dashboard/ui/dashboard-main-task';
import { DashboardPersonal } from '@/pages/dashboard/ui/dashboard-personal';
import { DashboardTaskLoadScore } from '@/pages/dashboard/ui/dashboard-task-load-score';
import { cn } from '@/shared/lib/utils';
import { NoteIcon } from '@/shared/ui/components/icons/note-icon';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { TodoIcon } from '@/shared/ui/components/icons/todo-icon';
import { UserIcon } from '@/shared/ui/components/icons/user-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Loading } from '@/shared/ui/layouts/loading';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageMain } from '@/shared/ui/layouts/page-main';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
import { Suspense } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/dashboard')({
  context: ({ context }) => ({
    ...context,
    htmlClassName: cn(context.htmlClassName, 'bg-custom'),
    appClassName: cn(context.appClassName, 'bg-muted'),
  }),
  component: App,
});

function App() {
  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-4xl pb-8">
        <PageTitleContainer>
          <PageTitle>Dashboard</PageTitle>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Button>
        </PageTitleContainer>
        <DashboardBuddy />
        <div className="space-y-1.5">
          <h3 className="font-bold">Features</h3>
          <div className="flex gap-2.25">
            <Button
              variant="outline"
              className="border-accent bg-accent/30 hover:bg-accent/50 h-12.5"
              asChild
            >
              <Link to="/todo">
                <TodoIcon />
                Todo
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-accent bg-accent/30 hover:bg-accent/50 h-12.5"
              asChild
            >
              <Link to="/diary">
                <NoteIcon />
                日記
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-accent bg-accent/30 hover:bg-accent/50 h-12.5"
              asChild
            >
              <Link to="/buddy">
                <UserIcon />
                Buddy
              </Link>
            </Button>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <Suspense fallback={<Loading />}>
          <DashboardTaskLoadScore />
          <DashboardMainTask />
          <DashboardBuddySuggestion />
          <DashboardPersonal />
        </Suspense>
      </PageMain>
    </>
  );
}
