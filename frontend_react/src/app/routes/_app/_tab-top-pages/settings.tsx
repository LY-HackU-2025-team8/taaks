import { Button } from '@/shared/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_tab-top-pages/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Button asChild className="mb-4">
        <Link to="/register/nickname">バディの設定</Link>
      </Button>
      <Button
        /** @todo 関数として分離 */
        onClick={() => {
          // トークンの無効化
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
