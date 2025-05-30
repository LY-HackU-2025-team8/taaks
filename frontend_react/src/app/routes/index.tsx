import { TaaksLogo } from '@/shared/ui/components/icons/taaks-logo';
import { Button } from '@/shared/ui/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-screen flex-col">
      <div className="relative mt-[5vh] flex h-full flex-col items-center justify-center gap-4 overflow-hidden">
        <img
          src="/assets/images/todo_3d.png"
          width={120}
          height={120}
          alt="Todo 3D"
          className="absolute top-20 -left-2 -z-10"
        />
        <img
          src="/assets/images/diary_3d.png"
          width={240}
          height={240}
          alt="Diary 3D"
          className="absolute -top-5 -right-5 z-10 -rotate-12"
        />
        <img
          src="/assets/images/todo_3d.png"
          width={200}
          height={200}
          alt="Todo 3D"
          className="absolute bottom-5 -left-5"
        />
        <img
          src="/assets/images/diary_3d.png"
          width={147}
          height={147}
          alt="Diary 3D"
          className="absolute right-0 bottom-15 -z-10 -rotate-12"
        />
        <TaaksLogo className="size-52" aria-label="Taaks Logo" role="img" />
        <p className="text-[3.75rem] font-bold">Taaks!</p>
      </div>

      <div className="mt-auto mb-[env(safe-area-inset-bottom)] flex gap-4 p-7">
        <Button className="flex-1" size="lg" asChild>
          <Link to="/register">はじめて使う</Link>
        </Button>
        <Button className="flex-1" variant="outline" size="lg" asChild>
          <Link to="/login">ログイン</Link>
        </Button>
      </div>
    </div>
  );
}
