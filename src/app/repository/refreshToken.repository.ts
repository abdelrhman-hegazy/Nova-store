import {RefreshToken} from "../model"
import {BaseRepository} from "./base.repository"
import {IRefreshToken} from "../interfaces"

class RefreshTokenRepository extends BaseRepository<IRefreshToken>{
    constructor(){
        super(RefreshToken)
    }
}

export const refreshTokenRepository = new RefreshTokenRepository();