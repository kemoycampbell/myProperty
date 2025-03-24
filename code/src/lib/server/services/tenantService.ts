import { UserException } from "../exceptions/UserException";
import { RoleType } from "../models/entity/role/Role";
import type { ITenant } from "../models/entity/Tenant/ITenant";
import type { TenantRepository } from "../repositories/tenant/tenantRepository";
import type { UnitRepository } from "../repositories/unit/unitRepository";
import type { UserService } from "./userService";

export class TenantService{
    private tenantRepository: TenantRepository
    private userService: UserService
    private unitRepository: UnitRepository;

    constructor(tenantRepository: TenantRepository, userService: UserService, unitRepository: UnitRepository) {
        this.tenantRepository = tenantRepository
        this.userService = userService
        this.unitRepository = unitRepository
    }

    /**
     * This allows a
     * @param first 
     * @param last 
     * @param email 
     * @param username 
     * @param password 
     * @returns 
     */
    async createTenantAccount(first:string, last:string, email:string,username: string, password: string): Promise<string>
    {
        const role = RoleType.TENANT;
        const token = await this.userService.register(first,last,email,username,password,role);
        return token;        
    }

    async getTenantById(id: string): Promise<ITenant> {
        if(!id) {
            throw new UserException("id is required", 400);
        }

        const res = await this.tenantRepository.findOne({where: {id: id}});
        if(!res) {
            throw new UserException("Tenant not found", 404);
        }
        return res;
    }

    async rent(tenant: Partial<ITenant>): Promise<ITenant>
    {
        if(!tenant.tenant) {
            throw new UserException("Tenant is required", 400);
        }

        if(!tenant.unit) {
            throw new UserException("Unit is required", 400);
        }
        if(!tenant.startDate) {
            throw new UserException("start date is required", 400);
        }
        if(!tenant.endDate) {
            throw new UserException("end date is required", 400);
        }

        await this.userService.getByUsername(tenant.tenant.username);
        const unit = await this.unitRepository.findOne({where: {id: tenant.unit.id}});
        if(!unit) {
            throw new UserException("Unit not found", 404);
        }

        return await this.tenantRepository.save(tenant);
    }

}