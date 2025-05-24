import { Button } from '@/shared/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from 'src/route-tree.gen';

type NavigationProps = {
  prev_path: keyof FileRoutesByTo;
};

export const RegisterNavigation = ({ prev_path }: NavigationProps) => {
  return (
    <nav className="text-muted fixed right-2 bottom-3.5 left-2 z-20 mb-[env(safe-area-inset-bottom)]">
      <ul className="flex h-16 items-center justify-around gap-2">
        <li className="contents">
          <Button asChild className="bg-primary size-16 rounded-xl">
            <Link to={prev_path}>←</Link>
          </Button>
        </li>
        <li className="contents">
          <Button type="submit" className="bg-primary h-16 flex-1 rounded-xl">
            次へ
          </Button>
        </li>
      </ul>
    </nav>
  );
};
