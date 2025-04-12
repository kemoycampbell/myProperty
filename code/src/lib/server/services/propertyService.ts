import { UserException } from "../exceptions/UserException";
import type { IProperty } from "../models/entity/property/IProperty";
import type { PropertyRepository } from "../repositories/property/propertyRepository";

export class PropertyService {
    private propertyRepository: PropertyRepository;

    constructor(propertyRepository: PropertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    /**
     * Create a new property
     * @param property 
     * @returns 
     */
    async createProperty(property: Partial<IProperty>): Promise<IProperty> {
        if (!property.owner) {
            throw new UserException("Owner is required", 400);
        }
        if (!property.name) {
            throw new UserException("name is required", 400);
        }

        if (!property.address_line1 || !property.city || !property.state || !property.zip) {
            throw new UserException("address_line1, city, state, zip are required", 400);
        }

        return await this.propertyRepository.save(property);
    }

    /**
     * Get property by id
     * @param id 
     * @returns 
     */
    async getPropertyById(id: string): Promise<IProperty> {
        if (!id) {
            throw new UserException("id is required", 400);
        }
        const res = await this.propertyRepository.findOne({ where: { id: id } });
        if (!res) {
            throw new UserException("Property not found", 404);
        }
        return res;
    }

    /**
     * Get all properties for a specific user (owner)
     * @param ownerId
     * @returns 
     */
    async getAllPropertiesByOwner(ownerId: string): Promise<IProperty[]> {
        if (!ownerId) {
            throw new UserException("Owner ID is required", 400);
        }

        const properties = await this.propertyRepository.find({
            where: {
                owner: {
                    id: ownerId,
                }
            }
        });

        if (properties.length === 0) {
            throw new UserException("No properties found for the given owner", 404);
        }

        return properties;
    }

    /**
     * Delete a property by id
     * @param id 
     * @returns 
     */
    async deleteProperty(id: string): Promise<void> {
        if (!id) {
            throw new UserException("id is required", 400);
        }

        const property = await this.propertyRepository.findOne({ where: { id } });

        if (!property) {
            throw new UserException("Property not found", 404);
        }

        await this.propertyRepository.remove(property);
    }

    /**
     * Update a property by id
     * @param id 
     * @param updates 
     * @returns 
     */
    async updateProperty(id: string, updates: Partial<IProperty>): Promise<IProperty> {
        if (!id) {
            throw new UserException("id is required", 400);
        }

        const property = await this.propertyRepository.findOne({ where: { id } });

        if (!property) {
            throw new UserException("Property not found", 404);
        }

        const updated = Object.assign(property, updates);

        return await this.propertyRepository.save(updated);
    }
}
