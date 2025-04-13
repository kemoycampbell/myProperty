import { Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IDocument } from "./IDocument";
import type { IDocType } from "../document_type/IDocType";
import { DocType } from "../document_type/DocType";

export class Document extends BaseEntity implements IDocument {

    //should be a foreign key reffering to the user table id
    @Column({type: 'varchar', length: 40, name: 'owner_id'})
    owner: string;
    @Column({type: 'varchar', length: 40, name: 'tenant_id'})
    tenant: string;

    @Column({type: 'varchar', length: 40, name: 'property_id'})
    unit: string;

    @Column({type: 'varchar', length: 100, name: 'path'})
    path: string;

    @ManyToOne(() => DocType, (type)=> type.id)
    @JoinColumn({ name: "doc_type_id" })
    docType: IDocType;

    
   
}