import { useCallback, type MouseEventHandler } from 'react';
import { useRouter } from '@tanstack/react-router';

/**
 * ブラウザバックを行うボタン
 * styleはButtonコンポーネントに任せる ButtonにはasChildを指定する
 **/
export const BackButton = ({
  onClick,
  ...props
}: React.ComponentProps<'button'>) => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      // 1ページ前に戻る
      router.history.back();
      // 他のコールバックがあれば実行
      onClick?.(e);
    },
    [onClick, router]
  );

  return <button onClick={handleClick} {...props} />;
};
