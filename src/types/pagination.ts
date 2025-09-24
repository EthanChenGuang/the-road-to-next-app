export type PaginatedData<T> = {
  list: T[];
  metadata: { hasNextPage: boolean; cursor?: string };
};
