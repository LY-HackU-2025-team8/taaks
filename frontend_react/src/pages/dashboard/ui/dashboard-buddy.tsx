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
    <div className="relative flex h-72 items-center">
      <div className="z-10 flex flex-col gap-3">
        <div className="flex flex-col text-xl font-bold">
          <span>{greeting}</span>
          <span>{buddy?.nickname}さん！</span>
        </div>
        <Button
          asChild
          className="bg-primary text-card rounded-full px-4 py-2 text-sm"
        >
          <Link to="/buddy">Buddyに会う</Link>
        </Button>
      </div>
      <RiveBuddy className="absolute right-0 z-0 h-72 w-60" />
    </div>
  );
};
