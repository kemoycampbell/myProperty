import { UserException } from "../exceptions/UserException";
import type { IProperty } from "../models/entity/property/IProperty";
import type { PropertyRepository } from "../repositories/property/propertyRepository";

export class PropertyService {
    private propertyRepository:PropertyRepository;

    constructor(propertyRepository:PropertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    /**
     * Create a new property
     * @param property 
     * @returns 
     */
    async createProperty(property:Partial<IProperty>): Promise<IProperty> {
        if(!property.owner) {
            throw new UserException("Owner is required", 400);
        }
        if(!property.name) {
            throw new UserException("name is required", 400);
        }
        

        if(!property.address_line1 || !property.city || !property.state || !property.zip) {
            throw new UserException("address_line1, city,state,zip are required", 400);
        }

        return await this.propertyRepository.save(property);
    }

    async getPropertyById(id: string): Promise<IProperty> {
        if(!id) {
            throw new UserException("id is required", 400);
        }
        const res = await this.propertyRepository.findOne({where: {id: id}});
        if(!res) {
            throw new UserException("Property not found", 404);
        }
        return res;
    }
}