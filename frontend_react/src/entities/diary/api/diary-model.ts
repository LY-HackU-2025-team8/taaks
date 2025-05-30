import type { components } from '@/shared/api/api-spec';

/** サーバーから返ってくるDiaryの型 */
export type DiaryResponseModel = components['schemas']['DiaryResponse'];
/** サーバーに送るDiaryの型 */
export type DiaryRequestModel = components['schemas']['DiaryRequest'];
