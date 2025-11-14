"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async findAll(filter = {}) {
        return this.model.find(filter).exec();
    }
    async find(filter) {
        return this.model.find(filter).exec();
    }
    async updateById(id, update) {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }
    async updateOne(filter, update) {
        return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
    }
    async updateMany(filter, update) {
        const result = await this.model.updateMany(filter, update).exec();
        return { modifiedCount: result.modifiedCount || 0 };
    }
    async deleteById(id) {
        const result = await this.model.findByIdAndDelete(id).exec();
        return !!result;
    }
    async deleteOne(filter) {
        const result = await this.model.findOneAndDelete(filter).exec();
        return !!result;
    }
    async deleteMany(filter) {
        const result = await this.model.deleteMany(filter).exec();
        return { deletedCount: result.deletedCount || 0 };
    }
    async count(filter) {
        return this.model.countDocuments(filter || {}).exec();
    }
    async exists(filter) {
        return this.model.exists(filter).then(result => !!result);
    }
    async countDocuments(filter) {
        return this.model.countDocuments(filter).exec();
    }
}
exports.BaseRepository = BaseRepository;
