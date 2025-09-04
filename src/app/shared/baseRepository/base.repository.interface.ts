import { Document, FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    updateById(id: string, update: UpdateQuery<T>): Promise<T | null>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null>;
    updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<{ modifiedCount: number }>;
    deleteById(id: string): Promise<boolean>;
    deleteOne(filter: FilterQuery<T>): Promise<boolean>;
    deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }>;
    count(filter?: FilterQuery<T>): Promise<number>;
    exists(filter: FilterQuery<T>): Promise<boolean>;
}