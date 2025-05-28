'use client';

import { cn } from '@/shared/lib/utils';
import * as React from 'react';

export type DatePickerProps = React.ComponentProps<'input'> & {
  /** 時刻を選択させるか */
  withTime?: boolean;
};

/** 日付選択のための仮置きコンポーネント */
export function DatePicker({
  className,
  withTime = false,
  ...props
}: DatePickerProps) {
  return (
    <input
      className={cn('font-bold', className)}
      type={withTime ? 'datetime-local' : 'date'}
      {...props}
    />
  );
}
