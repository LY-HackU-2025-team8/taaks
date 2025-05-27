import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
} from '@/entities/buddy/ui/buddy-message-card';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/components/shadcn/button';

export type BuddyMessageCardProps = React.ComponentProps<'section'>;

export const BuddySuggestTask = ({
  className,
  ...props
}: BuddyMessageCardProps) => {
  return (
    <section className={cn('px-3.5', className)} {...props}>
      <BuddyMessageCard className="h-40 overflow-hidden">
        <img
          src="/assets/images/todo_3d.png"
          alt="Todo"
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
    </section>
  );
};
