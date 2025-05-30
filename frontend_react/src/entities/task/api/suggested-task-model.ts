import type { components } from '@/shared/api/api-spec';

/** サーバーから返ってくるSuggestedTaskの型 */
export type SuggestedTaskResponseModel =
  components['schemas']['GeneratedTaskResponse'];
