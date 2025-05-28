import { DATE_DATA_REGEX } from '@/shared/constant';

/** YYYY-MM-DD形式のstringをDateにrefineする */
export const refineDateFormat = (val: string) => {
  const m = DATE_DATA_REGEX.exec(val);
  if (!m?.groups) return false; // フォーマット不一致

  const { year, month, day } = m.groups;
  const [y, M, d] = [year, month, day].map(Number);

  // 月と日が 1–12, 1–31 の範囲内か
  if (!(1 <= M && M <= 12 && 1 <= d && d <= 31)) return false;

  // 実在する日付かチェック
  const dt = new Date(Date.UTC(y, M - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() + 1 === M &&
    dt.getUTCDate() === d
  );
};
