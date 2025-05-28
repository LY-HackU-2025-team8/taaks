import { format } from 'date-fns';
import { DATETIME_DATA_FORMAT } from '../constant';

/** その日付の開始時刻を取得する */
const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

/** その日付の終了時刻を取得する */
const getEndOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

/** 今日のデータだけを取得するためのクエリを返す */
export const filterToday = (date: Date) => ({
  dueAt_gt: format(getStartOfDay(date), DATETIME_DATA_FORMAT),
  dueAt_lt: format(getEndOfDay(date), DATETIME_DATA_FORMAT),
});
