
import { CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import type { IEntity } from "./IEntity";

/**
 * Base entity class that all entities should extend
 */

@Entity()
export class BaseEntity implements IEntity 
{
    //automatically generate UUID
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

}