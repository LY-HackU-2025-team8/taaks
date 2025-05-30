import { z } from 'zod';

/** タスクを作成・編集するためのフォームのスキーマ */
export const taskFormSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  memo: z.string(),
  dueAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
  isAllDay: z.boolean(),
  loadScore: z.number().nullable(),
  autoCalculateLoadScore: z.boolean().optional(),
});
