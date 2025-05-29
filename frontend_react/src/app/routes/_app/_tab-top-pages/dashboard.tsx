import { DashboardBuddy } from '@/pages/dashboard/ui/dashboard-buddy';
import { ToolLinkButton } from '@/pages/dashboard/ui/tool-link-button';
import { cn } from '@/shared/lib/utils';
import { SettingsIcon } from '@/shared/ui/components/icons/settings-icon';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageHeader } from '@/shared/ui/layouts/page-header';
import { PageTitle } from '@/shared/ui/layouts/page-title';
import { PageTitleContainer } from '@/shared/ui/layouts/page-title-container';
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
          <h3 className="font-bold">Tools</h3>
          <div className="flex gap-2.25">
            <ToolLinkButton to="/todo">ToDoリスト</ToolLinkButton>
            <ToolLinkButton to="/diary">日記</ToolLinkButton>
            <ToolLinkButton to="/buddy">Buddy</ToolLinkButton>
          </div>
        </div>
      </PageHeader>
    </>
  );
}
