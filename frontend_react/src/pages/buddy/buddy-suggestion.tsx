import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { AddTaskDrawer } from '@/entities/task/ui/add-task-drawer';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { useGreeting } from '@/shared/hooks/use-greeting';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { PageSectionTitle } from '@/shared/ui/layouts/page-section-title';
import { Link } from '@tanstack/react-router';

const MorningSuggestion = () => {
  const { formal } = useGreeting();
  return (
    <BuddyMessageCard className="bg-card relative flex flex-col overflow-clip">
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
      <AddTaskDrawer>
        <Button
          variant="primary"
          size="sm"
          className="absolute right-3.5 bottom-3.5"
        >
          タスクを入れる
        </Button>
      </AddTaskDrawer>
    </BuddyMessageCard>
  );
};

const EveningSuggestion = () => {
  const { formal } = useGreeting();
  return (
    <BuddyMessageCard className="bg-card min-h-40 overflow-clip">
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
      <Button
        variant="primary"
        size="sm"
        className="absolute right-3.5 bottom-3.5"
        asChild
      >
        <Link to="/diary">日記を書く</Link>
      </Button>
    </BuddyMessageCard>
  );
};

export const BuddySuggestion = () => {
  const date = useCurrentDate({ timeResolution: 'day' });
  const hours = date.getHours();

  return (
    <PageSection>
      <PageSectionTitle>僕からの提案だよ</PageSectionTitle>
      {hours < 12 ? <MorningSuggestion /> : <EveningSuggestion />}
    </PageSection>
  );
};
