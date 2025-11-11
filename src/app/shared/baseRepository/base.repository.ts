import { Model, FilterQuery, UpdateQuery, UpdateWriteOpResult, Types } from "mongoose";
import { IBaseRepository } from "./base.repository.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }
    async findById(id: string | Types.ObjectId): Promise<T | null> {
        return this.model.findById(id).exec();
    }
    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }
    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }
    async updateById(id: string | Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }
    async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
    }
    async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<{ modifiedCount: number }> {
        const result: UpdateWriteOpResult = await this.model.updateMany(filter, update).exec();
        return { modifiedCount: result.modifiedCount || 0 };
    }
    async deleteById(id: string | Types.ObjectId): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec(); // true 
        return !!result;
    }
    async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
        const result = await this.model.findOneAndDelete(filter).exec();
        return !!result;
    }
    async deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }> {
        const result = await this.model.deleteMany(filter).exec();
        return { deletedCount: result.deletedCount || 0 };
    }
    async count(filter?: FilterQuery<T> | undefined): Promise<number> {
        return this.model.countDocuments(filter || {}).exec();
    }
    async exists(filter: FilterQuery<T>): Promise<boolean> {
        return this.model.exists(filter).then(result => !!result);
    }
}