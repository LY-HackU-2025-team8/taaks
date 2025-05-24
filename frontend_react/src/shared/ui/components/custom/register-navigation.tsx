import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from 'src/route-tree.gen';
import { Button } from '@/shared/ui/components/shadcn/button';

type NavigationProps = {
  prev_path: keyof FileRoutesByTo;
};

export const RegisterNavigation = ({
  prev_path,
}: NavigationProps) => {
  return (
    <nav className="text-muted fixed right-2 bottom-3.5 left-2 mb-[env(safe-area-inset-bottom)]">
      <ul className="flex h-16 items-center justify-around gap-2">
        <li className="contents">
          <Button asChild>
            <Link
              to={prev_path}
            >
              ←
            </Link>
          </Button>
        </li>
        <li className="contents">
          <Button type="submit">
              次へ
          </Button>
        </li>
      </ul>
    </nav>
  );
};
