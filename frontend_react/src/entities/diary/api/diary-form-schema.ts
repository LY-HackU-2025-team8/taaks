import { z } from 'zod';

/** 日記を作成・編集するためのフォームのスキーマ */
export const diaryFormSchema = z.object({
  title: z.string(),
  body: z.string().min(1, '本文を入力してください'),
  date: z.date(),
});
