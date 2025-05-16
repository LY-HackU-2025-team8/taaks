'use client';

import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/ui/components/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/shadcn/popover';
import * as React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export type DatePickerProps = {
  className?: string;
  date?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker({
  className,

  date: propDate,
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(propDate);

  React.useEffect(() => {
    if (onChange) {
      onChange(date);
    }
  }, [date, onChange]);

  React.useEffect(() => {
    setDate(propDate);
  }, [propDate]);

  return (
    <Popover>
      <PopoverTrigger
        className={cn('font-bold', !date && 'text-muted-foreground', className)}
      >
        {date ? (
          format(date, 'M月dd日(EEE)', { locale: ja })
        ) : (
          <span>日付を選択</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const ClockIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <path
      stroke="#121403"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M11.934 1.213H8.64A7.64 7.64 0 0 0 1 8.853v3.293a7.64 7.64 0 0 0 7.64 7.641h3.294a7.64 7.64 0 0 0 7.64-7.64V8.854a7.64 7.64 0 0 0-7.64-7.641Z"
      style={{
        stroke: '#121403',
        strokeOpacity: 1,
      }}
    />
    <path
      stroke="#121403"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.287 4.563V10.5h6.415"
      style={{
        stroke: '#121403',
        strokeOpacity: 1,
      }}
    />
  </svg>
);
export default ClockIcon;
