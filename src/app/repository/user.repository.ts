import { IUser } from "../interfaces";
import { BaseRepository } from "./base.repository";
import { User } from "../model/user.model";
class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User)
    }
}

export const userRepository = new UserRepository();