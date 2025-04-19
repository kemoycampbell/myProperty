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
        if (!unit.property) {
            throw new UserException("Property is required");
        }

        await this.propertyService.getPropertyById(unit.property.id);

        if (!unit.number) {
            throw new UserException("Number is required");
        }

        return await this.unitRepository.save(unit);
    }

    async getById(id: string): Promise<IUnit> {
        if (!id) {
            throw new UserException("Unit ID is required");
        }

        const unit = await this.unitRepository.findOne({ where: { id } });

        if (!unit) {
            throw new UserException("Unit not found");
        }
        return unit;
    }

    /**
     * Get all units associated with a specific property.
     * @param propertyId - The ID of the property.
     * @returns An array of units associated with the property.
     */
    async getByPropertyId(propertyId: string): Promise<IUnit[]> {
        if (!propertyId) {
            throw new UserException("Property ID is required");
        }
        
        await this.propertyService.getPropertyById(propertyId);

        const units = await this.unitRepository.find({
            where: { property: { id: propertyId } },
        });

        if (!units || units.length === 0) {
            throw new UserException("No units found for the given property", 404);
        }

        return units;
    }

    // /**
    //  * Delete a unit by id
    //  * @param id 
    //  * @returns 
    //  */
    // async deleteUnit(id: string): Promise<void> {
    //     if (!id) {
    //         throw new UserException("id is required", 400);
    //     }

    //     const unit = await this.unitRepository.findOne({ where: { id } });

    //     if (!unit) {
    //         throw new UserException("Unit not found", 404);
    //     }

    //     await this.unitRepository.remove(unit);
    // }

    // /**
    //  * Update a unit by id
    //  * @param id 
    //  * @param updates 
    //  * @returns 
    //  */
    // async updateUnit(id: string, updates: Partial<IUnit>): Promise<IUnit> {
    //     if (!id) {
    //         throw new UserException("id is required", 400);
    //     }

    //     const unit = await this.unitRepository.findOne({ where: { id } });

    //     if (!unit) {
    //         throw new UserException("Unit not found", 404);
    //     }

    //     const updated = Object.assign(unit, updates);

    //     return await this.unitRepository.save(updated);
    // }
}