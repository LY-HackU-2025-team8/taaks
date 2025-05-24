import { Button } from '@/shared/ui/components/shadcn/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top/account')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_me');
          // 画面をリロード
          window.location.reload();
        }}
      >
        ログアウト
      </Button>
    </div>
  );
}
