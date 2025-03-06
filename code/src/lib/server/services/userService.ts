import bcrypt from "bcryptjs";
import { UserException } from "../exceptions/UserException";
import type { IUserRepository } from "../repositories/User/IUserRepository";
import type { RoleType } from "../models/entity/role/Role";
import jwt from "../jwt/jwt";
import type { IUser } from "../models/entity/User/IUser";

export class AuthenticateService {
    private readonly PASSWORD_SALT_ROUNDS = 10;
    private readonly UNAUTHORIZED_STATUS = 401;

    private repository: IUserRepository
    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    
    async authenticate(username: string, password: string): Promise<string> 
    {
        if(!username || !password) {
            throw new UserException("Username and password are required", this.UNAUTHORIZED_STATUS);
        }

        //attempt to find the username. UserException will be thrown if the username is not found
        const user = await this.repository.findByUsername(username);

        //compare the password hashes
        const match = await bcrypt.compare(password, user.password);
        
        if(!match) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        //return a jwt generated token for the user
        return jwt.generate(user);
    }

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
}