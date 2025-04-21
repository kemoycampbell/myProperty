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

    private repository: IUserRepository;
    private roleRepository: RoleRepository;

    constructor(repository: IUserRepository, roleRepository: RoleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    /**
     * This method takes a username and password then attempts to authenticate the user.
     * If the user is authenticated, a JWT token is returned; otherwise, an exception is thrown.
     * @param username 
     * @param password 
     * @returns A JWT token for the authenticated user.
     */
    async authenticate(username: string, password: string): Promise<string> {
        if (!username || !password) {
            throw new UserException("Username and password are required", this.UNAUTHORIZED_STATUS);
        }

        const user = await this.repository.findByUsername(username);

        if (!user) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new UserException("Invalid credential", this.UNAUTHORIZED_STATUS);
        }

        const payload = {
            username: user.username,
            role: user.role.name,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        return jwt.generate(payload);
    }

    /**
     * This method takes a username, password, role, and registers the user in the system.
     * @param first - First name of the user.
     * @param last - Last name of the user.
     * @param email - Email of the user.
     * @param username - Username of the user.
     * @param password - Password of the user.
     * @param role - Role of the user (e.g., ADMIN, TENANT, etc.).
     * @returns A JWT token for the newly registered user.
     */
    async register(first: string, last: string, email: string, username: string, password: string, role: RoleType): Promise<string> {
        if (!first || !last) {
            throw new UserException("First and last name are required", 400);
        }
        if (!email) {
            throw new UserException("Email is required", 400);
        }
        if (!username || !password) {
            throw new UserException("Username and password are required", 400);
        }
        if (!role) {
            throw new UserException("Role is required", 400);
        }

        password = await bcrypt.hash(password, this.PASSWORD_SALT_ROUNDS);
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
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email
        };

        return jwt.generate(payload);
    }

    /**
     * Get all users in the system.
     * @returns An array of all users.
     */
    async getAllUsers(): Promise<IUser[]> {
        const users = await this.repository.find();

        if (!users || users.length === 0) {
            throw new UserException("No users found", 404);
        }

        return users;
    }

    /**
     * Get a user by their username.
     * @param username - The username of the user.
     * @returns The user object.
     */
    async getByUsername(username: string): Promise<IUser> {
        return await this.repository.findByUsername(username);
    }

    /**
     * Get a user by their ID.
     * @param id - The ID of the user.
     * @returns The user object.
     */
    async getById(id: string): Promise<IUser> {
        const res = await this.repository.findOne({ where: { id } });
        if (!res) {
            throw new UserException(`User with id ${id} not found`, 404);
        }
        return res;
    }

    /**
     * Delete a user by their ID.
     * @param id - The ID of the user.
     * @returns A boolean indicating whether the deletion was successful.
     */
    async delete(id: string): Promise<boolean> {
        const res = await this.repository.delete({ id: id });
        return res.affected !== null && res.affected === 1;
    }
}