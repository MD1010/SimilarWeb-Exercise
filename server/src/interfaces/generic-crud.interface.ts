export interface IReadEntity<T> {
  fetchPaginated: (
    filter: { [key: string]: any },
    cursor: string | undefined,
    limit?: number | undefined
  ) => Promise<T[]>;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  deleteOne: (id: string) => Promise<void>;
}
