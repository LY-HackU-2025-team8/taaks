import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from './user-query-options';

export const useUser = ({ userId }: { userId?: string } = {}) => {
  const { data: user, isLoading } = useQuery(userQueryOptions(userId));

  return {
    user,
    isLoading,
  };
};
