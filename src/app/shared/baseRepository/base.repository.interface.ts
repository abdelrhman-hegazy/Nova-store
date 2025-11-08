import { FilterQuery, Types, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findById(id: Types.ObjectId): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    updateById(id: Types.ObjectId, update: UpdateQuery<T>): Promise<T | null>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null>;
    updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<{ modifiedCount: number }>;
    deleteById(id: Types.ObjectId): Promise<boolean>;
    deleteOne(filter: FilterQuery<T>): Promise<boolean>;
    deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }>;
    count(filter?: FilterQuery<T>): Promise<number>;
    exists(filter: FilterQuery<T>): Promise<boolean>;
}