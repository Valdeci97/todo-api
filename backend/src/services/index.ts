import HttpException from '../exceptions/HttpException';
import { Model } from '../interfaces/ModelInterface';

export default abstract class Service<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public abstract create(_obj: T): Promise<T>;

  public abstract read(): Promise<T[]>;

  public abstract readOne(_id: string): Promise<T>;

  public abstract update(_id: string, _obj: T): Promise<T>;

  public async delete(id: string): Promise<void> {
    const deletedObj = await this.model.delete(id);
    if (!deletedObj) throw new HttpException(500, 'Failed to delete document');
  }
}
