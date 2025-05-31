'use client';

import { DATE_DISPLAY_FORMAT } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/components/shadcn/button';
import { Calendar } from '@/shared/ui/components/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/shadcn/popover';
import { format } from 'date-fns';

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onChange' | 'value'>;

export const DatePicker = ({
  value,
  onChange,
  className,
  ...props
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          {...props}
        >
          {value ? (
            format(value, DATE_DISPLAY_FORMAT)
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar required mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};
