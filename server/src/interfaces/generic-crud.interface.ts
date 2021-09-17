export interface IReadEntity<T> {
  find: (filter: { [key: string]: any }, pageNumber: string | undefined) => Promise<T[]>;
  findOne: (filter: { [key: string]: any }) => Promise<T>;
}

export interface IWriteEntity<T> {
  create: (entity: T) => Promise<T>;
  updateOne: (id: string, item: T) => Promise<void>;
  deleteOne: (id: string) => Promise<void>;
}
