import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IDocType } from "./IDocType";



//create an enum that represent the various document types of the tenants
export enum DocumentType {
    RENTAL_APPLICATION = "RENTAL APPLICATION",
    LEASE_AGREEMENT = "LEASE AGREEMENT",
    IDENTIFICATION = "IDENTIFICATION",
    INCOME_PROOF = "INCOME PROOF",
    SECURITY_DEPOSIT = "SECURITY DEPOSIT",
    MOVE_IN_INSPECTION = "MOVE IN INSPECTION",
    MOVE_OUT_INSPECTION = "MOVE OUT INSPECTION",
    PET_AGREEMENT = "PET AGREEMENT",
    EVICTION_NOTICE = "EVICTION NOTICE",
    NOTICE_TO_ENTER = "NOTICE TO ENTER",
    NOTICE_OF_RENTAL_INCREASE = "NOTICE OF RENTAL INCREASE",
}


@Entity()
export class DocType extends BaseEntity implements IDocType {

    @Column({
        type: "enum",
        enum: DocumentType,
        unique: true
    })
    name: DocumentType
}