import { Entity } from "./entity";

export interface Profile extends Entity
{
    firstName: string;
    lastName: string;
}