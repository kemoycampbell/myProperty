import { UserException } from "$lib/server/exceptions/UserException";
import { RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import { User } from "$lib/server/models/entity/User/User";
import { Repository, type QueryRunner } from "typeorm";

export class UserRepository extends Repository<IUser>
{
    private readonly NOT_FOUND_STATUS:number = 404;
    //pass the source through the constructor
    constructor(source: QueryRunner)
    {
        super(User, source.manager);
    }
    
    /**
     * Override the safe so that it checks if the user exist prior to saving
     * @param entity 
     * @param options 
     * @returns 
     */
    override async save<T extends IUser>(entity: T, options?: any): Promise<T>
    {
        const exist = await this.findOne({ where: { username: entity.username } });
        if(exist)
        {
            throw new UserException(`User with username ${entity.username} already exists`, 400);
        }
        return await super.save(entity, options);
    }
    async findByUsername(username: string): Promise<IUser>
    {
        const result = await this.findOne({ 
            where: { username },
            relations: ['role']
        });
        if(!result)
        {
           throw new UserException(`User with username ${username} not found`, this.NOT_FOUND_STATUS);
        }
        return result;
        
    }

    // implement the findByRole method
    async findByRole(role: string): Promise<IUser[]>
    {
        const result = await this.find({
            relations: ['role'],
            where: {
                role: {
                    name: RoleType.MAINTENANCE_OPERATOR
                }
            }
        });        

        if (!result || result.length === 0) {
            throw new UserException(`No users found with role ${role}`, this.NOT_FOUND_STATUS);
        }
        
        return result;
    }
}