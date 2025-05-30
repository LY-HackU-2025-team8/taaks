export const getNextPageParam = (lastPage: { page?: { number?: number; totalPages?: number } }) => {
  const number = lastPage.page?.number ?? 0;
  const totalPages = lastPage.page?.totalPages ?? 1;
  return number < totalPages - 1 ? number + 1 : undefined;
};
