export interface CrudModel<T> {
  create(obj: T): Promise<Partial<T>>;
  read(): Promise<Array<Partial<T>>>;
  readOne(id: string): Promise<Partial<T> | null>;
  update(id: string, obj: T): Promise<Partial<T> | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<T | null>;
}
