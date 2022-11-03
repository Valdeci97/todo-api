import { Model } from '../interfaces/ModelInterface';

export default abstract class Service<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public abstract create(_obj: T): Promise<Partial<T>>;

  public abstract read(): Promise<Array<Partial<T>>>;

  public abstract readOne(_id: string): Promise<Partial<T>>;

  public abstract update(_id: string, _obj: T): Promise<Partial<T>>;

  public abstract delete(_id: string): Promise<void>;
}
