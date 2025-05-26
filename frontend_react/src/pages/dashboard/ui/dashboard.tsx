import { PageHeader } from '@/shared/ui/page/page-header';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { DashboardBuddy } from './dashboard-buddy';
import { ToolLinkButton } from './tool-link-button';

export const Dashboard = () => {
  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-4xl pb-8">
        <PageTitleContainer>
          <PageTitle>Dashboard</PageTitle>
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
};
