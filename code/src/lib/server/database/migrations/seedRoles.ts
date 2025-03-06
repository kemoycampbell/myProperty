import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { DataSource } from "typeorm";

/**
 * This is a function that seeds the roles in the database
 * @param source 
 */
const seedRoles = async(source: DataSource) => {
    const repository = source.getRepository(Role);
    const roles = Object.values(RoleType).map((role) => ({ name: role }));

    await repository
    .createQueryBuilder()
    .insert()
    .into(Role)
    .values(roles)
    .orIgnore()
    .execute();
};

export default seedRoles;