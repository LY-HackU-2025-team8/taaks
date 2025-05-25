import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  memo: z.string(),
  dueAt: z.coerce.date(),
  completedAt: z.coerce.date().optional(),
  isAllDay: z.boolean(),
  loadScore: z.number().min(0).max(10),
});
