import { useCallback, type MouseEventHandler } from 'react';
import { useRouter } from '@tanstack/react-router';

export const BackButton = ({
  onClick,
  ...props
}: React.ComponentProps<'button'>) => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      router.history.back();
      onClick?.(e);
    },
    [onClick, router]
  );

  return <button onClick={handleClick} {...props} />;
};
