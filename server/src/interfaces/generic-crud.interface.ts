export interface IReadEntity<T> {
  fetchPaginated: (
    sortBy: string,
    order: SortOrder,
    cursor: string | undefined,
    limit?: number | undefined
  ) => Promise<T[]>;
}

export interface IWriteEntity<T> {
  create: (entity: T, entityLocator: string, allowDuplicates: boolean) => Promise<T>;
  deleteOne: (id: string) => Promise<void>;
}
export type SortOrder = 1 | -1;
