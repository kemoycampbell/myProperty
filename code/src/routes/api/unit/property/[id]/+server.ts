import database from "$lib/server/database/database";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { PropertyService } from "$lib/server/services/propertyService";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { UnitService } from "$lib/server/services/unitService";
import { processAPIRequest } from "../../../../../middleware/apiResponse";
import { json } from "@sveltejs/kit";

const propertyRepository: PropertyRepository = new PropertyRepository(database.createQueryRunner());
const propertyService: PropertyService = new PropertyService(propertyRepository);

const unitRepository = new UnitRepository(database.createQueryRunner());
const unitService = new UnitService(unitRepository, propertyService);

export const GET = processAPIRequest(async ({ params }) => {
    const propertyId = params.id;
    const units = await unitService.getByPropertyId(propertyId);
    return json({ status: 200, units });
});
