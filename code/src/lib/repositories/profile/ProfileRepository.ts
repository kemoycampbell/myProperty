import type { Profile } from "../../models/profile";
import type { IProfileRepository } from "./IProfileRepository";
import type {PoolClient} from 'pg';

export class profileRepository implements IProfileRepository {
    constructor(private db: PoolClient) {}

    async getById(id: number): Promise<Profile> {
        const result = await this.db.query('SELECT first_name, last_name FROM profiles WHERE id = $1', [id]);
        return result.rows[0];
    }

    async getAll(): Promise<Profile[]> {
        const result = await this.db.query('SELECT first_name, last_name FROM profiles');
        return result.rows;
    }

    async add(entity: Partial<Profile>): Promise<Profile> {
        const result = await this.db.query('INSERT INTO profiles (first_name, last_name) VALUES ($1, $2) RETURNING email, first_name, last_name', [entity.firstName, entity.lastName]);
        return result.rows[0];
    }

    async update(entity: Profile): Promise<Profile> {
        const result = await this.db.query('UPDATE profiles SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING first_name, last_name', [entity.firstName, entity.lastName, entity.id]);
        return result.rows[0];
    }

    async delete(entity: Profile): Promise<void> {
        await this.db.query('DELETE FROM profiles WHERE id = $1', [entity.id]);
    }

    async getByEmail(email: string): Promise<Profile> {
        const result = await this.db.query('SELECT first_name, last_name FROM profiles WHERE email = $1', [email]);
        return result.rows[0];
    }


}