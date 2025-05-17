import { PageHeader } from '@/shared/ui/page/page-header';
import { PageMain } from '@/shared/ui/page/page-main';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader className="bg-custom text-custom-foreground rounded-b-[32px] pb-8">
        <div className="flex items-center px-[13px] py-3.5">
          <h1 className="text-[28px] font-bold">Todo</h1>
        </div>
        <div className="p-3.5">
          <h3 className="text-2xl font-bold">4月</h3>
        </div>
      </PageHeader>
      <PageMain className="flex-1">本体</PageMain>
    </div>
  );
}
