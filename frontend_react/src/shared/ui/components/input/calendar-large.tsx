import { format } from 'date-fns';
import { Calendar } from '../shadcn/calendar';

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
          'text-sm font-bold font-line-seed first:text-red-700 last:text-blue-700',
        week: 'contents',
        day: 'rounded-[19px] flex flex-col items-center justify-center p-1.5 -m-0.5',
        day_button:
          'aspect-square max-h-12 bg-background rounded-lg w-full h-full font-bold font-line-seed',
        selected: 'text-foreground bg-primary/20',
        today: '',
        button_next:
          'bg-custom-foreground/10 hover:bg-custom-foreground/15 size-7 rounded-sm flex items-center justify-center transition-all',
        button_previous:
          'bg-custom-foreground/10 hover:bg-custom-foreground/15 size-7 rounded-sm flex items-center justify-center transition-all',
      }}
      formatters={{
        formatCaption: (date) => format(date, 'M月'),
        formatWeekdayName: (weekday) => format(weekday, 'E'),
      }}
      showOutsideDays={false}
      {...props}
    />
  );
};
