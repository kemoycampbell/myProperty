import bcrypt from "bcryptjs";
import { UserException } from "../exceptions/UserException";
import type { IUserRepository } from "../repositories/User/IUserRepository";
import { User } from "../models/entity/User/User";

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
        const passwordHash = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);

        const match = await bcrypt.compare(password, user.password);
        
        if(!match) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        return "token";
    }

    async register(username: string, password: string):Promise<string>
    {
        if(!username || !password) {
            throw new UserException("Username and password are required", 400);
        }
        //hash the password
        password = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);

        const user = {username: username, password: password};
        await this.repository.save(user);

        return "token generated"
    }
}