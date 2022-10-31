export interface Model<T> {
  create(obj: T): Promise<T>;
  read(): Promise<Array<Partial<T>>>;
  readOne(id: string): Promise<Partial<T>>;
  update(id: string, obj: T): Promise<Partial<T>>;
  delete(id: string): Promise<void>;
}
