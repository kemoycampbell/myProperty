import database from "$lib/server/database/database";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { PropertyService } from "$lib/server/services/propertyService";
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "../../../middleware/apiResponse";
import { json } from '@sveltejs/kit';


const userRepository: UserRepository = new UserRepository(database.createQueryRunner());
const roleRepository: RoleRepository = new RoleRepository(database.createQueryRunner());
const userService: UserService = new UserService(userRepository, roleRepository);

const propertyRepository: PropertyRepository = new PropertyRepository(database.createQueryRunner());
const propertyService: PropertyService = new PropertyService(propertyRepository);


//api endpoint to create a new property
export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    console.log(data);
    const property = {
        owner: await userService.getById(data.owner),
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        city: data.city,
        state: data.state,
        zip: data.zip
    }
    const res = await propertyService.createProperty(data);
    return json({status:200, property:res});
});

