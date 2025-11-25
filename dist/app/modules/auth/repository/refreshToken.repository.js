"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRepository = void 0;
const refreshToken_model_1 = require("../models/refreshToken.model");
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
class RefreshTokenRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(refreshToken_model_1.RefreshToken);
    }
}
exports.refreshTokenRepository = new RefreshTokenRepository();
