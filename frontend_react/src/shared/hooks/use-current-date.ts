import { useEffect, useState } from 'react';

type TimeResolutionOption = 'day' | 'hour' | 'minute' | 'second';

export type UseCurrentDateOptions = {
  timeResolution?: TimeResolutionOption;
};

const timeIntervals = {
  day: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  hour: 60 * 60 * 1000, // 1 hour in milliseconds
  minute: 60 * 1000, // 1 minute in milliseconds
  second: 1000, // 1 second in milliseconds
} satisfies Record<TimeResolutionOption, number>;

const getNextTickDelay = (date: Date, resolution: TimeResolutionOption) => {
  const ms = date.getTime();
  const interval = timeIntervals[resolution];
  return interval - (ms % interval);
};

export const useCurrentDate = ({
  timeResolution = 'day',
}: UseCurrentDateOptions = {}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setCurrentDate(new Date());
      },
      getNextTickDelay(currentDate, timeResolution)
    );

    return () => clearTimeout(timeout);
  }, [timeResolution, currentDate]);

  return currentDate;
};
