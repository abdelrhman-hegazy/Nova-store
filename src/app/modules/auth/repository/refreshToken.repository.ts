import { RefreshToken } from "../model/refreshToken.model"
import { BaseRepository } from "../../../shared/baseRepository/base.repository"
import { IRefreshToken } from "../interface/auth.interface"

class RefreshTokenRepository extends BaseRepository<IRefreshToken> {
    constructor() {
        super(RefreshToken)

    }
}
export const refreshTokenRepository = new RefreshTokenRepository();