import { UserException } from "../Exceptions/UserException";
import type { Profile } from "../models/profile";
import { type IRepository } from "../repositories/IRepository";

export class ProfileService {
    constructor(private profileRepository: IRepository<Profile>) {}

    async getProfileById(id: number): Promise<Profile> {
        if(id < 0) {
            throw new UserException("User Id cannot be negative!");
        
        }
        const result = await this.profileRepository.getById(id);

        if(!result) {
            throw new UserException("Profile not found!");
        }

        return result;
    }
}