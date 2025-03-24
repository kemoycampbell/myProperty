import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { Repository } from "typeorm";

//This extends the Repository interface from TypeORM 
/**
 * TypeORM already has the following methods:
 * findById
 * save
 * remove
 * update
 * delete
 * 
 * If you want know what else si there, click here: https://typeorm.io/#/repository-api
 */
export interface IUserRepository extends Repository<IUser> {
    findByUsername(username: string): Promise<IUser>;
}