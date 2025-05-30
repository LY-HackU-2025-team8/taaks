import { PageSection } from '@/shared/ui/layouts/page-section';
import {
  BuddyMessageCard,
  BuddyMessageCardHeader,
  BuddyMessageCardDescription,
  BuddyMessageCardContent,
} from '@/entities/buddy/ui/buddy-message-card';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { Button } from '@/shared/ui/components/shadcn/button';
import { AddTaskDrawer } from '@/entities/task/ui/add-task-drawer';
import { Link } from '@tanstack/react-router';
import { useGreeting } from '@/shared/hooks/use-greeting';

const MorningSuggestion = () => {
  const { formal } = useGreeting();
  return (
    <BuddyMessageCard
      className='overflow-clip flex flex-col relative'
    >
      <img
        src="/assets/images/todo_3d.png"
        alt="タスクバインダーのイラスト"
        className="absolute top-0 -right-8 bottom-0 my-auto size-60"
      />
      <BuddyMessageCardHeader>
        <BuddyMessageCardDescription>
          Buddyからの提案
        </BuddyMessageCardDescription>
      </BuddyMessageCardHeader>
      <BuddyMessageCardContent className="break-keep">
        {formal}
        <wbr />
        今日はどんな1日に
        <wbr />
        しますか？
      </BuddyMessageCardContent>
      {/* <BuddyMessageCardContent className="text-card-foreground">
        <BuddyMessageCardDescription>
          ToDoを入れてしっかり管理しよう。
        </BuddyMessageCardDescription>
      </BuddyMessageCardContent> */}
      <AddTaskDrawer>
        <Button
          variant="primary-inverted"
          size="sm"
          className="absolute right-3.5 bottom-3.5"
        >
          タスクを入れる
        </Button>
      </AddTaskDrawer>

    </BuddyMessageCard>
  );
}

const EveningSuggestion = () => {
  const { formal } = useGreeting();
  return (
    <BuddyMessageCard
      className='overflow-clip min-h-40'
    >
      <img
        src="/assets/images/diary_3d.png"
        alt="日記帳のイラスト"
        className="absolute top-0 -right-8 bottom-0 my-auto size-54"
      />

      <BuddyMessageCardHeader>
        <BuddyMessageCardDescription>
          Buddyからの提案
        </BuddyMessageCardDescription>
      </BuddyMessageCardHeader>
      <BuddyMessageCardContent className="break-keep">
        {formal}
        <wbr />
        どんな1日でしたか？
      </BuddyMessageCardContent>
      {/* <BuddyMessageCardContent className="text-card-foreground">
        <BuddyMessageCardDescription>
          忘れないうちに日記を書いておこう。
        </BuddyMessageCardDescription>
      </BuddyMessageCardContent> */}
      <Button
        variant="primary-inverted"
        size="sm"
        className="absolute right-3.5 bottom-3.5"
        asChild
      >
        <Link
          to="/diary"
        >
          日記を書く
        </Link>
      </Button>

    </BuddyMessageCard>
  );
}

export const DashboardBuddySuggestion = () => {

  const date = useCurrentDate({ timeResolution: 'day' });
  const hour = date.getHours();
  console.log('Current hour:', hour);

  return (
    <PageSection>
      {hour < 19 ? (
        <MorningSuggestion />
      ) : (
        <EveningSuggestion />
      )}
    </PageSection>
  );
};
