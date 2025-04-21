import type { DataSource } from 'typeorm';
import { User } from '$lib/server/models/entity/User/User';
import { Role, RoleType } from '$lib/server/models/entity/role/Role';

const seedUsers = async (source: DataSource) => {
    const userRepository = source.getRepository(User);
    const roleRepository = source.getRepository(Role);

    const roleNames: RoleType[] = [
        RoleType.OWNER,
        RoleType.TENANT,
        RoleType.MAINTENANCE_MANAGER,
        RoleType.MAINTENANCE_OPERATOR
    ];

    const users: User[] = [];

    for (const roleName of roleNames) {
        const role = await roleRepository.findOneBy({ name: roleName });
        if (!role) {
            console.error(`Role ${roleName} not found! Skipping...`);
            continue;
        }

        for (let i = 1; i <= 3; i++) {
            const user = new User();
            user.username = `${roleName.toLowerCase()}${i}`;
            user.password = `password${i}`; // You can hash this later
            user.email = `${roleName.toLowerCase()}${i}@example.com`;
            user.firstName = `${roleName.toLowerCase()}First${i}`;
            user.lastName = `${roleName.toLowerCase()}Last${i}`;
            user.role = role;

            users.push(user);
        }
    }

    console.log('Seeding users:', users.map(u => u.username));

    await userRepository.save(users);
};

export default seedUsers;
