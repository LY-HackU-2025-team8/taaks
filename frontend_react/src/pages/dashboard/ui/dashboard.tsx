import { PageHeader } from '@/shared/ui/page/page-header';
import { PageTitle } from '@/shared/ui/page/page-title';
import { PageTitleContainer } from '@/shared/ui/page/page-title-container';
import { Buddy } from './buddy';
import { ToolLink } from './tool-link';

export const Dashboard = () => {
  return (
    <>
      <PageHeader className="bg-custom text-custom-foreground rounded-b-[32px] pb-8">
        <PageTitleContainer>
          <PageTitle>Dashboard</PageTitle>
        </PageTitleContainer>

        <Buddy />

        <div className="space-y-1.5">
          <h3 className="font-bold">Tools</h3>
          <div className="flex gap-2.25">
            <ToolLink to="/todo">ToDoリスト</ToolLink>
            <ToolLink to="/diary">日記</ToolLink>
            <ToolLink to="/buddy">Buddy</ToolLink>
          </div>
        </div>
      </PageHeader>
    </>
  );
};
