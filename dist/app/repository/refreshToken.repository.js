"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRepository = void 0;
const model_1 = require("../model");
const base_repository_1 = require("./base.repository");
class RefreshTokenRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(model_1.RefreshToken);
    }
}
exports.refreshTokenRepository = new RefreshTokenRepository();
