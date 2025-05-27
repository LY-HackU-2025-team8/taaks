import { format } from 'date-fns';
import { INTERNAL_DATETIME_FORMAT } from '../constant';

export const filterToday = (date: Date) => ({
  dueAt_gt: format(date, INTERNAL_DATETIME_FORMAT),
  dueAt_lt: format(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59),
    INTERNAL_DATETIME_FORMAT
  ),
});
