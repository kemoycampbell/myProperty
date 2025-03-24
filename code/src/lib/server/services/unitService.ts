import { UserException } from "../exceptions/UserException";
import type { IUnit } from "../models/entity/unit/IUnit";
import type { UnitRepository } from "../repositories/unit/unitRepository";
import type { PropertyService } from "./propertyService";

export class UnitService {
    private unitRepository: UnitRepository;
    private propertyService: PropertyService;

    constructor(unitRepository: UnitRepository, propertyService: PropertyService) {
        this.unitRepository = unitRepository;
        this.propertyService = propertyService;
    }


    async create(unit: Partial<IUnit>): Promise<IUnit> {
        if(!unit.property) {
            throw new UserException("Property is required");
        }

        //ensure that the unit exist
        await this.propertyService.getPropertyById(unit.property.id);

        if(!unit.number) {
            throw new UserException("number is required");
        }

        return await this.unitRepository.save(unit);
        
    }

}