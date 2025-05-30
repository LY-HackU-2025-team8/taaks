/** @fileoverview グローバルに扱う定数など */

export const TASK_CARD_SMALL_PATH =
  'M106.504 2.5C113.365 2.5 117.826 11.4574 116.879 18.2528C116.686 19.6408 116.586 21.0587 116.586 22.5C116.586 39.3447 130.241 53 147.086 53H157.921C159.462 53 160.977 52.8856 162.457 52.6649C169.422 51.626 179 56.2234 179 63.2654V134.5C179 145.546 170.046 154.5 159 154.5H20C8.95431 154.5 3.8658e-07 145.546 0 134.5V22.5C0 11.4543 8.95431 2.5 20 2.5H106.504Z';

export const DATETIME_DATA_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

export const DATE_DATA_FORMAT = 'yyyy-MM-dd';
export const DATE_DATA_REGEX = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
export const DATE_DISPLAY_FORMAT = 'yyyy年M月d日';

export const CUSTOM_COLORS = new Map([
  [1, 'green'],
  [2, 'yellow'],
  [3, 'red'],
  [4, 'pink'],
  [5, 'purple'],
  [6, 'blue'],
  [7, 'cyan'],
]);
