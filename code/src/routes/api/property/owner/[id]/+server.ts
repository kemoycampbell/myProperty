// src/routes/api/properties/owner/[id]/+server.ts

import database from "$lib/server/database/database";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { PropertyService } from "$lib/server/services/propertyService";
import { processAPIRequest } from "../../../../../middleware/apiResponse";
import { json } from "@sveltejs/kit";

const propertyRepository = new PropertyRepository(database.createQueryRunner());
const propertyService = new PropertyService(propertyRepository);

export const GET = processAPIRequest(async ({ params }) => {
    const ownerId = params.id;
    if (!ownerId) {
        return json({ status: 400, message: "ownerId is required" }, { status: 400 });
    }

    const properties = await propertyService.getAllPropertiesByOwner(ownerId);
    return json({ status: 200, properties });
});
