"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
const user_model_1 = require("../models/user.model");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.User);
    }
}
exports.userRepository = new UserRepository();
