import database from "$lib/server/database/database";
import { EmergencyContactRepository } from "$lib/server/repositories/emergency_contact/emergencyContactRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { EmergencyContactService } from "$lib/server/services/emergencyContactService";
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";

const runner = database.createQueryRunner();
const emergencyContactRepository: EmergencyContactRepository = new EmergencyContactRepository(runner);
const userRepository: UserRepository = new UserRepository(runner);
const emergencyContactService: EmergencyContactService = new EmergencyContactService(
    emergencyContactRepository, 
    userRepository
);

export const GET = processAPIRequest(async ({ params}) => {
    const data = params.id;
    const emergencyContact = await emergencyContactService.getEmergencyContactById(data);
    return json({
        status: 200, 
        data: emergencyContact
    });
});