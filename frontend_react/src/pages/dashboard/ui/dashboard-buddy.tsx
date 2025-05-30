import { $api } from '@/shared/api/openapi-fetch';
import { useGreeting } from '@/shared/hooks/use-greeting';
import { RiveBuddy } from '@/shared/ui/components/rive/rive-buddy';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Link } from '@tanstack/react-router';

/** ダッシュボード上部のBuddy */
export const DashboardBuddy = () => {
  // TODO: 取得できなかった時のエラーハンドリングを追加する
  const { data: buddy } = $api.useSuspenseQuery('get', '/buddy');

  // 時間帯に応じて挨拶を変更する
  const { casual } = useGreeting();
  return (
    <div className="relative flex h-72 items-center overflow-x-clip overflow-y-visible">
      <div className="z-1 flex flex-col items-start gap-3">
        <Heading size="xl" variant="custom" className="break-keep">
          {casual}
          <wbr />
          {buddy?.nickname}さん！
        </Heading>
        <Button asChild size="sm" variant="primary">
          <Link to="/buddy">{buddy?.name}に会う</Link>
        </Button>
      </div>
      <div className="pointer-events-none flex h-72 w-full flex-col">
        <RiveBuddy
          className="absolute -top-16 -right-18 size-96 mask-b-from-60% mask-b-to-90%"
          motionId={1}
          faceId={3}
          hairId={buddy?.hairStyleId ?? 1}
          clothesId={buddy?.clothesId ?? 1}
        />
      </div>
    </div>
  );
};
