import { IUser } from "../interface/user.interface";
import { BaseRepository } from "../../../shared/baseRepository/base.repository";
import { User } from "../models/user.model";
class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User)
    }
}

export const userRepository = new UserRepository();