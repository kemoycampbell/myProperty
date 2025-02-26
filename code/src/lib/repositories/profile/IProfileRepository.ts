import { Profile } from "../../models/profile";
import { IRepository } from "../IRepository";

export interface IProfileRepository extends IRepository<Profile> {
    getByEmail(email: string): Promise<Profile>;
}