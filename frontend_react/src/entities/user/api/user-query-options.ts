import { fetchLocalStorage } from '@/shared/lib/fetch-local-storage';
import type { QueryOptions } from '@tanstack/react-query';
import type { User } from '../model/user';

export const userQueryOptions = (userId?: string) =>
  ({
    queryKey: ['user', userId],
    queryFn: () => fetchLocalStorage<User>(`user_${userId || 'me'}`),
  }) satisfies QueryOptions<User>;
