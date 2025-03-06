import bcrypt from "bcryptjs";
import { UserException } from "../exceptions/UserException";
import type { IUserRepository } from "../repositories/User/IUserRepository";
import type { RoleType } from "../models/entity/role/Role";
import jwt from "../jwt/jwt";
import type { IUser } from "../models/entity/User/IUser";

export class UserService {
    private readonly PASSWORD_SALT_ROUNDS = 10;
    private readonly UNAUTHORIZED_STATUS = 401;

    private repository: IUserRepository
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    /**
     * This method takes a username and password then attempt to authenticate the user
     * If the user is authenticated, a jwt token is returned else an exception is thrown
     * @param username 
     * @param password 
     * @returns 
     */
    async authenticate(username: string, password: string): Promise<string> 
    {
        if(!username || !password) {
            throw new UserException("Username and password are required", this.UNAUTHORIZED_STATUS);
        }

        //attempt to find the username. UserException will be thrown if the username is not found
        const user = await this.repository.findByUsername(username);
        console.log(user);

        //compare the password hashes
        const match = await bcrypt.compare(password, user.password);
        
        if(!match) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        const payload  = {
            username: user.username,
            id: user.id,
        }

        //return a jwt generated token for the user
        return jwt.generate(payload);
    }

    /**
     * This method takes username, password, role and register the user to the system
     * @param username 
     * @param password 
     * @param role 
     * @returns 
     */
    async register(username: string, password: string, role:RoleType):Promise<string> 
    {
        if(!username || !password) {
            throw new UserException("Username and password are required", 400);
        }
        if(!role) {
            throw new UserException("Role is required", 400);
        }

        //hash the password
        password = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);

        const user = {username: username, password: password};
        await this.repository.save(user);

        //return a jwt generated token for the user
        return jwt.generate(user);
    }

    async getByUsername(username:string):Promise<IUser>{
        return await this.repository.findByUsername(username);
    }

    async getById(id:string):Promise<IUser>{
        const res = await this.repository.findOne({ where: { id } });
        if(!res)
            throw new UserException(`User with id ${id} not found`, 404);
        return res;
    }

    //for now we will just delete. But we will need to perform some
    //type of validation when deleting a user
    async delete(id: string): Promise<boolean> {
        const res = await this.repository.delete({ id: id });
        return res.affected !== null && res.affected === 1;
    }
}