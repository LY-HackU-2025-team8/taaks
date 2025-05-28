import { Button } from '@/shared/ui/components/shadcn/button';
import { Card, CardContent } from '@/shared/ui/components/shadcn/card';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Text } from '@/shared/ui/components/typography/text';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';

export type NoDiaryCardProps = Omit<
  React.ComponentProps<typeof Card>,
  'children'
> & {
  /** 日記を書くよう促す日付 */
  date: Date;
};

/** 当日の日記がない時に日記を書くように促すカード */
export const NoDiaryCard = ({ date, ...props }: NoDiaryCardProps) => {
  return (
    <PageSection>
      <Card {...props}>
        <CardContent className="flex flex-col gap-4">
          <div className="text-foreground flex w-fit flex-col">
            <Heading className="text-4xl leading-none">
              {format(date, 'MM')}
            </Heading>
            <Heading className="text-4xl leading-none">
              {format(date, 'dd')}
            </Heading>
            <Separator className="my-2" />
            <Heading className="text-lg leading-none">
              {format(date, 'EEE')}
            </Heading>
          </div>
          <Heading className="mt-3 text-3xl font-bold break-keep">
            今日の記録を
            <wbr />
            残しておこう！
          </Heading>
          <Text className="text-sm">
            今日はまだ日記が記入されていません。今日がどんな日だったか、見返せるように記録してみませんか？
          </Text>
          <Separator />
          <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2">
            <Text className="text-sm">こなしたタスク数</Text>
            <Text className="text-sm">負荷スコア</Text>
            <Text className="font-line-seed text-3xl font-bold">20</Text>
            <Text className="font-line-seed text-3xl font-bold">100</Text>
          </div>
          <Button size="lg" asChild>
            <Link to="/diary/new">日記を作成</Link>
          </Button>
        </CardContent>
      </Card>
    </PageSection>
  );
};
