import { Button } from '@/shared/ui/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col p-7">
      <div className="mt-auto mb-[env(safe-area-inset-bottom)] flex gap-4">
        <Button className="flex-1" size="lg" asChild>
          <Link to="/login">はじめて使う</Link>
        </Button>
        <Button className="flex-1" variant="outline" size="lg" asChild>
          <Link to="/login">ログイン</Link>
        </Button>
      </div>
    </div>
  );
}
