import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Button } from '@/shared/ui/components/shadcn/button';
import { PageSection } from '@/shared/ui/layouts/page-section';

type BuddyMessageCardProps = ComponentPropsWithoutChildren<typeof PageSection>;

/** 明日のタスクを整理することを促すカード */
export const BuddySuggestTask = (props: BuddyMessageCardProps) => {
  return (
    <PageSection {...props}>
      <BuddyMessageCard className="h-40 overflow-hidden">
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
          もしまだ余裕があれば
          <wbr />
          明日やることを
          <wbr />
          整理してみませんか？
        </BuddyMessageCardContent>
        <Button
          variant="primary-inverted"
          size="sm"
          className="absolute right-3.5 bottom-3.5"
        >
          明日のタスクを追加する
        </Button>
      </BuddyMessageCard>
    </PageSection>
  );
};
