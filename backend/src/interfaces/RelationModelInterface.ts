export interface RelationModel<T> {
  create(obj: T): Promise<T>;
  read(relationId: string): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, obj: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
