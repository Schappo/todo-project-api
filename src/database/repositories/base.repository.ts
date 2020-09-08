import { mongoose, DocumentType } from '@typegoose/typegoose';
import { MongoId } from '../../@types';
import { omit } from 'lodash';

export type ModelType<T> = mongoose.Model<DocumentType<T>> & T;
export type QueryFilterType<T> = { [P in keyof T]?: any } & { [key: string]: any };

export abstract class BaseRepository<T> {
  protected model: ModelType<T>;

  constructor(model: ModelType<T>) {
    this.model = model;
  }

  async findAll(query: QueryFilterType<T> = {}, populate?: string, limit = 0, skip = 0): Promise<T[]> {
    const match = await this.model
      .find(query)
      .limit(limit)
      .skip(skip)
      .populate({ path: populate ? populate : '' })
      .exec();
    return match ? match.map(item => item.toObject()) : [];
  }

  async findOne(query: QueryFilterType<T> = {}, select?: string, populate?: string): Promise<T | null> {
    const match =
      select && select.length > 1
        ? await this.model
            .findOne(query)
            .populate({ path: populate ? populate : '' })
            .select(select)
            .exec()
        : await this.model.findOne(query).exec();
    return match ? match.toObject() : null;
  }

  async findById(id: MongoId): Promise<T | null> {
    const match = await this.model.findById(id).exec();
    return match ? match.toObject() : null;
  }

  async create(item: T): Promise<T> {
    const stored = await this.model.create(omit(item as any, ['_id', 'createdAt']));
    return stored.toObject();
  }

  async delete(id: MongoId): Promise<DocumentType<T> | null> {
    return await this.model.findByIdAndRemove(id).exec();
  }

  async update(id: MongoId, item: Partial<T>): Promise<T | null> {
    const updated = await this.model.findByIdAndUpdate(id, omit(item, ['_id', 'createdAt']), { new: true }).exec();
    return updated ? updated.toObject() : null;
  }

  async clearCollection(query: QueryFilterType<T> = {}): Promise<any> {
    return await this.model.deleteMany(query).exec();
  }

  public getModel(): ModelType<T> {
    return this.model;
  }

  async exists(query: QueryFilterType<T> = {}): Promise<boolean> {
    return this.model.exists(query);
  }
}
