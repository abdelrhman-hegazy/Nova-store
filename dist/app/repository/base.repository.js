"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(data);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findById(id).exec();
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne(filter).exec();
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            return this.model.find(filter).exec();
        });
    }
    updateById(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
        });
    }
    updateOne(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
        });
    }
    updateMany(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.updateMany(filter, update).exec();
            return { modifiedCount: result.modifiedCount || 0 };
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndDelete(id).exec(); // true 
            return !!result;
        });
    }
    deleteOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findOneAndDelete(filter).exec();
            return !!result;
        });
    }
    deleteMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.deleteMany(filter).exec();
            return { deletedCount: result.deletedCount || 0 };
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.countDocuments(filter || {}).exec();
        });
    }
    exists(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.exists(filter).then(result => !!result);
        });
    }
}
exports.BaseRepository = BaseRepository;
