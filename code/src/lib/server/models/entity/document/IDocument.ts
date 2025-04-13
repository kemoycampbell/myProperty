import type { IEntity } from "../common/IEntity";
import type { IDocType } from "../document_type/IDocType";

export interface IDocument extends IEntity {
    owner: string,
    tenant: string,
    unit:string
    path: string
    docType: IDocType
}