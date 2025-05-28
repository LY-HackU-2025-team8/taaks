import { CUSTOM_COLORS } from '@/shared/constants';
import {
  CLOTHES_OPTIONS,
  HAIR_OPTIONS,
} from '@/shared/constants/buddy-options';
import { z } from 'zod';

export const createBuddyFormSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: 'ニックネームを入力してください' })
    .max(5, {
      message: 'ニックネームは5文字以内で入力してください',
    }),
  hairStyleId: z.coerce
    .number()
    .int()
    .min(1, { message: '髪型を選択してください' })
    .max(HAIR_OPTIONS.length, {
      message: `髪型は${HAIR_OPTIONS.length}種類から選択してください`,
    }),
  clothesId: z.coerce
    .number()
    .int()
    .min(1, { message: '服装を選択してください' })
    .max(CLOTHES_OPTIONS.length, {
      message: `服装は${CLOTHES_OPTIONS.length}種類から選択してください`,
    }),
  colorId: z.coerce
    .number()
    .int()
    .min(1, { message: '色を選択してください' })
    .max(CUSTOM_COLORS.size, {
      message: `色は${CUSTOM_COLORS.size}種類から選択してください`,
    }),
  name: z.string().min(1, { message: 'Buddyの名前を入力してください' }).max(5, {
    message: 'Buddyの名前は5文字以内で入力してください',
  }),
});
