"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
const auth_model_1 = require("../model/auth.model");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(auth_model_1.User);
    }
}
exports.userRepository = new UserRepository();
