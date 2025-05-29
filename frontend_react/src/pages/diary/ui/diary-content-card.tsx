import { $api } from '@/shared/api/openapi-fetch';
import { DATE_DATA_FORMAT, DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { useCurrentDate } from '@/shared/hooks/use-current-date';
import type { ComponentPropsWithoutChildren } from '@/shared/types';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Card, CardContent } from '@/shared/ui/components/shadcn/card';
import { Separator } from '@/shared/ui/components/shadcn/separator';
import { Heading } from '@/shared/ui/components/typography/heading';
import { Text } from '@/shared/ui/components/typography/text';
import { PageSection } from '@/shared/ui/layouts/page-section';
import { Link } from '@tanstack/react-router';
import { format, isSameDay } from 'date-fns';

type DiaryContentCardProps = ComponentPropsWithoutChildren<typeof Card> & {
  /** 日記を書くよう促す日付 */
  date: Date;
};

/** 当日の日記がない時に日記を書くように促すカード */
export const DiaryContentCard = ({ date, ...props }: DiaryContentCardProps) => {
  const { data: diary } = $api.useSuspenseQuery('get', '/diaries', {
    params: {
      query: {
        date_eq: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  const { data: stats } = $api.useSuspenseQuery('get', '/days/{day}', {
    params: {
      path: {
        day: format(date, DATE_DATA_FORMAT),
      },
    },
  });
  const currentDate = useCurrentDate({ timeResolution: 'day' });
  const isToday = isSameDay(date, currentDate);

  return (
    <PageSection>
      <Card {...props}>
        <CardContent className="flex flex-col gap-4">
          <div className="text-foreground flex w-fit flex-col p-1">
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
          {diary.content?.length ? (
            <Text>{diary.content[0].body}</Text>
          ) : (
            <>
              <Heading className="mt-2 text-3xl font-bold break-keep">
                {isToday ? '今日' : 'この日'}の記録を
                <wbr />
                残しておこう！
              </Heading>
              <Text className="text-sm">
                {isToday ? '今日' : format(date, DATE_DISPLAY_FORMAT)}
                はまだ日記が記入されていません。
                {isToday ? '今日' : 'この日'}
                がどんな日だったか、見返せるように記録してみませんか？
              </Text>
            </>
          )}
          <Separator />
          <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2">
            <Text className="text-sm">こなしたタスク数</Text>
            <Text className="text-sm">負荷スコア</Text>
            <Text className="font-line-seed text-3xl font-bold">
              {stats.uncompletedTaskCount}
            </Text>
            <Text className="font-line-seed text-3xl font-bold">
              {stats.loadScore}
            </Text>
          </div>
          <Button size="lg" asChild>
            <Link
              to="/diary/new"
              search={{ date: format(date, DATE_DATA_FORMAT) }}
            >
              日記を作成
            </Link>
          </Button>
        </CardContent>
      </Card>
    </PageSection>
  );
};
