import { IUserDocument} from "../interfaces";
import { BaseRepository } from "./base.repository";
import { User } from "../model/user.model";
export class UserRepository extends BaseRepository<IUserDocument> {
    constructor(){
        super(User)
    }
}

export const userRepository = new UserRepository();