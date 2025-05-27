import { format } from 'date-fns';
import { SERVER_GET_DATETIME_FORMAT } from '../constant';

export const filterToday = (date: Date) => ({
  dueAt_gt: format(date, SERVER_GET_DATETIME_FORMAT),
  dueAt_lt: format(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59),
    SERVER_GET_DATETIME_FORMAT
  ),
});
