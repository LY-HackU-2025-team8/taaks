export const getNextPageParam = ({ number = 0, totalPages = 1 }) =>
  number < totalPages - 1 ? number + 1 : undefined;
