import bcrypt from "bcryptjs";
import { UserException } from "../exceptions/UserException";
import type { IUserRepository } from "../repositories/user/IUserRepository";
import type { RoleType } from "../models/entity/role/Role";
import jwt from "../jwt/jwt";
import type { IUser } from "../models/entity/User/IUser";
import type { RoleRepository } from "../repositories/role/RoleRepository";


export class UserService {
    private readonly PASSWORD_SALT_ROUNDS = 10;
    private readonly UNAUTHORIZED_STATUS = 401;

    private repository: IUserRepository
    private roleRepository: RoleRepository;

    constructor(repository: IUserRepository, roleRepository: RoleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
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
        //console.log(user);

        //compare the password hashes
        const match = await bcrypt.compare(password, user.password);
        
        if(!match) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        //created the jwt payload with selected data

        const payload = {
            username: user.username,
            role: user.role.name,
            id: user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
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
    async register(first:string, last:string, email:string,username: string, password: string, role:RoleType):Promise<string> 
    {
        if(!first || !last) {
            throw new UserException("First and last name are required", 400);
        }
        if(!email) {
            throw new UserException("Email is required", 400);
        }

        if(!username || !password) {
            throw new UserException("Username and password are required", 400);
        }
        if(!role) {
            throw new UserException("Role is required", 400);
        }

        //hash the password
        password = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);
        console.log(role);
        const roleEntity = await this.roleRepository.findByName(role);

        const user = {
            username: username, 
            password: password, 
            role: roleEntity,
            firstName: first,
            lastName: last,
            email: email
        };
        const res = await this.repository.save(user);
        
        const payload = {
            username: res.username,
            role: res.role.name,
            id: res.id,
            firstName:res.firstName,
            lastName:res.lastName,
            email:res.email
        }

        //return a jwt generated token for the user
        return jwt.generate(payload);
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