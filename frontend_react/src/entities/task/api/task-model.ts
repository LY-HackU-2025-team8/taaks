import type { components } from '@/shared/api/api-spec';

/** サーバーから返ってくるTaskの型 */
export type TaskResponseModel = components['schemas']['TaskResponse'];
/** サーバーに送るTaskの型 */
export type TaskRequestModel = components['schemas']['TaskRequest'];
