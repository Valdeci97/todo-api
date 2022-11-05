import { RelationModel } from '../interfaces/RelationModelInterface';

export default abstract class RelationService<T> {
  protected model: RelationModel<T>;

  constructor(model: RelationModel<T>) {
    this.model = model;
  }

  public abstract create(_obj: T): Promise<T>;

  public abstract read(_relationId: string): Promise<T[]>;

  public abstract readOne(_id: string): Promise<T>;

  public abstract update(_id: string, _obj: T): Promise<T>;

  public abstract delete(_id: string): Promise<void>;
}
