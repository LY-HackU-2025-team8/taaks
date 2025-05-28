import { useEffect, useState } from 'react';

type TimeResolutionOption = 'day' | 'hour' | 'minute' | 'second';

export type UseCurrentDateOptions = {
  /** 時間の更新頻度 */
  timeResolution?: TimeResolutionOption;
};

/** 時間の単位ごとのミリ秒 */
const timeIntervals = {
  day: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  hour: 60 * 60 * 1000, // 1 hour in milliseconds
  minute: 60 * 1000, // 1 minute in milliseconds
  second: 1000, // 1 second in milliseconds
} satisfies Record<TimeResolutionOption, number>;

/** 次の更新までの遅延時間を取得する */
const getNextTickDelay = (date: Date, resolution: TimeResolutionOption) => {
  const ms = date.getTime();
  const interval = timeIntervals[resolution];
  return interval - (ms % interval);
};

/** 自動更新される現在の日付を取得するカスタムフック */
export const useCurrentDate = ({
  timeResolution = 'day',
}: UseCurrentDateOptions = {}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    // 次に00になった時に日付を更新する
    const timeout = setTimeout(
      () => {
        // 現在の日付を更新
        setCurrentDate(new Date());
      },
      // 次の更新までの遅延時間
      getNextTickDelay(currentDate, timeResolution)
    );

    // クリーンアップ
    return () => clearTimeout(timeout);
  }, [timeResolution, currentDate]);

  return currentDate;
};
