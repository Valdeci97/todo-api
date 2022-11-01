import HttpException from '../exceptions/HttpException';
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

  public async delete(id: string): Promise<void> {
    const deletedObj = await this.model.delete(id);
    if (!deletedObj) throw new HttpException(500, 'Failed to delete document');
  }
}
