import { endOfDay, format, startOfDay } from 'date-fns';
import { DATETIME_DATA_FORMAT } from '../constants';

/** 今日のデータだけを取得するためのクエリを返す */
export const filterTodayTasks = (date: Date) => ({
  dueAt_gt: format(startOfDay(date), DATETIME_DATA_FORMAT),
  dueAt_lt: format(endOfDay(date), DATETIME_DATA_FORMAT),
});
