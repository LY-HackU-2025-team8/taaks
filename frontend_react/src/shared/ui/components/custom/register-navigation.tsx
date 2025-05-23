import { Link } from '@tanstack/react-router';

type NavigationProps = {
  prev_path: string;
  next_path: string;
  disabledNext?: boolean;
  onClickNext?: () => void;
};

export const RegisterNavigation = ({
  prev_path,
  next_path,
  disabledNext = false,
  onClickNext,
}: NavigationProps) => {
  return (
    <nav className="text-muted fixed right-2 bottom-3.5 left-2 mb-[env(safe-area-inset-bottom)]">
      <ul className="flex h-16 items-center justify-around gap-2">
        <li className="contents">
          <Link
            to={prev_path}
            className="bg-primary flex size-14 flex-col items-center justify-center rounded-[1.25rem] text-[1rem]"
          >
            ←
          </Link>
        </li>
        <li className="contents">
          <Link
            to={next_path}
            className="bg-primary flex size-14 flex-1 flex-col items-center justify-center rounded-[1.25rem] text-[1rem]"
            disabled={disabledNext}
            onClick={onClickNext}
          >
            次へ
          </Link>
        </li>
      </ul>
    </nav>
  );
};
