import { format } from 'date-fns';
import { Calendar } from '../shadcn/calendar';

/** Todo画面、日記画面で使用される日付選択コンポーネント */
export const CalendarLarge = ({
  ...props
}: React.ComponentProps<typeof Calendar>) => {
  return (
    <Calendar
      className="mx-auto w-full p-0"
      classNames={{
        month_grid:
          'grid grid-cols-7 [&_thead]:contents [&_tbody]:contents -mx-1.5',
        caption_label: 'text-xl font-bold font-line-seed',
        weekdays: 'contents',
        weekday:
          'text-sm uppercase font-bold font-line-seed first:text-red-700 last:text-blue-700 pb-1',
        week: 'contents',
        day: 'rounded-[19px] flex flex-col items-center justify-center p-1.5 -m-0.5',
        day_button:
          'aspect-square max-h-12 bg-background [.today_&]:bg-foreground [.today_&]:text-background rounded-lg w-full h-full font-bold font-line-seed',
        selected: 'bg-primary/20',
        today: 'today',
        button_next:
          'bg-custom-foreground/10 hover:bg-custom-foreground/15 size-7 rounded-sm flex items-center justify-center transition-all',
        button_previous:
          'bg-custom-foreground/10 hover:bg-custom-foreground/15 size-7 rounded-sm flex items-center justify-center transition-all',
      }}
      formatters={{
        // 日付、曜日の表示形式をここで設定できる
        formatCaption: (date) => format(date, 'M月'),
        formatWeekdayName: (weekday) => format(weekday, 'E'),
      }}
      showOutsideDays={false}
      {...props}
    />
  );
};
