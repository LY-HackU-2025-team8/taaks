import { LOAD_SCORE_TEXT } from '../constants/load-score-text';

export const getLoadScoreText = (score: number): string =>
  // 最低閾値を超えていて、かつ最も大きいスコアのテキストを取得
  [...LOAD_SCORE_TEXT].reduce((prev, current) =>
    current[0] <= score && current[0] > prev[0] ? current : prev
  )[1];
