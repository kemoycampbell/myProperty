import database from "$lib/server/database/database";
import { EmergencyContactRepository } from "$lib/server/repositories/emergency_contact/emergencyContactRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { EmergencyContactService } from "$lib/server/services/emergencyContactService";
import { json } from "@sveltejs/kit"
import { processAPIRequest } from "../../../middleware/apiResponse";

const runner = database.createQueryRunner();
const emergencyContactRepository = new EmergencyContactRepository(runner);
const userRepository = new UserRepository(runner);
const service = new EmergencyContactService(
    emergencyContactRepository, 
    userRepository
);

export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    const res = await service.createEmergencyContact(
        data.userTenantID,
        data.firstName,
        data.lastName,
        data.email,
        data.phone
    );

    return json({
        status: 200,
        emergencyContactRequest: res
    })
});