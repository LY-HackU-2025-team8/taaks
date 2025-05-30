import { z } from 'zod';

/** タスクを作成・編集するためのフォームのスキーマ */
export const taskFormSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  memo: z.string(),
  dueAt: z.coerce.date(),
  remainderAt: z.coerce.date().nullable(),
  completedAt: z.coerce.date().nullable(),
  isAllDay: z.boolean(),
  loadScore: z.number().min(0).max(10),
});
