import { $api } from '@/shared/api/openapi-fetch';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { RiveBuddy } from '@/shared/ui/components/custom/rive-buddy';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';

/** ダッシュボード上部のBuddy */
export const DashboardBuddy = () => {
  const { data: buddy } = $api.useQuery('get', '/buddy');

  // 時間帯に応じて挨拶を変更する
  const date = useCurrentDate({ timeResolution: 'hour' });
  const hours = date.getHours();
  const greeting =
    hours < 10 ? 'おはよう' : hours < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <div className="relative flex h-72 items-center overflow-x-clip overflow-y-visible">
      <div className="z-10 flex flex-col gap-3">
        <div className="flex flex-col text-xl font-bold whitespace-nowrap">
          <span className="block">{greeting}</span>
          <span className="block">{buddy?.nickname}さん！</span>
        </div>
        <Button asChild className="w-fit text-sm" variant="primary">
          <Link to="/buddy">{buddy?.name}に会う</Link>
        </Button>
      </div>
      <div className="flex h-72 w-full flex-col pointer-events-none">
        <RiveBuddy
          className="absolute -top-16 -right-18 size-96 mask-b-from-60% mask-b-to-100%"
          motionId={1}
          faceId={3}
          hairId={buddy?.hairStyleId ?? 1}
          clothesId={buddy?.clothesId ?? 1}
        />
      </div>
    </div>
  );
};
