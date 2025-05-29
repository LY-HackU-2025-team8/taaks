import {
  BuddyMessageCard,
  BuddyMessageCardContent,
  BuddyMessageCardDescription,
  BuddyMessageCardHeader,
  BuddyMessageCardRightElement,
} from '@/entities/buddy/ui/buddy-message-card';
import { getLoadScoreText } from '@/shared/api/get-load-score-text';
import { cn } from '@/shared/lib/utils';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Progress } from '@/shared/ui/components/shadcn/progress';
import { Heading } from '@/shared/ui/components/typography/heading';

type TaskLoadScoreCardProps = ComponentPropsWithoutChildren<
  typeof BuddyMessageCard
> & {
  loadScore: number;
};

export const TaskLoadScoreCard = ({
  loadScore,
  className,
  ...props
}: TaskLoadScoreCardProps) => {
  return (
    <BuddyMessageCard className={cn('overflow-clip', className)} {...props}>
      <BuddyMessageCardRightElement className="right-0 size-40">
        <img src="/assets/images/dumbbell_3d.png" alt="ダンベルのイラスト" />
      </BuddyMessageCardRightElement>
      <BuddyMessageCardHeader>
        <BuddyMessageCardDescription>負荷スコア</BuddyMessageCardDescription>
      </BuddyMessageCardHeader>
      <BuddyMessageCardContent className="flex-row items-baseline justify-start gap-2">
        <Heading size="4xl">{loadScore}</Heading>
        <Heading size="sm">{getLoadScoreText(loadScore)}</Heading>
      </BuddyMessageCardContent>
      <BuddyMessageCardContent className="relative z-2 mt-2 -mr-40">
        <Progress value={Math.min(loadScore || 0, 100)} />
      </BuddyMessageCardContent>
    </BuddyMessageCard>
  );
};
