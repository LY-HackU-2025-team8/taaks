import { $api } from '@/shared/api/openapi-fetch';
import { RiveBuddy } from '@/shared/ui/components/custom/rive-buddy';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Link } from '@tanstack/react-router';

export const DashboardBuddy = () => {
  const { data: user } = $api.useQuery('get', '/users/me');

  // 時間帯に応じて挨拶を変更する
  const date = new Date();
  const hours = date.getHours();
  const greeting =
    hours < 10 ? 'おはよう' : hours < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <div className="relative flex h-72 items-center">
      <div className="z-10 flex flex-col gap-3">
        <div className="text-2xl font-bold">
          <span className="block">{greeting}</span>
          <span className="block">{user?.nickname}さん！</span>
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
