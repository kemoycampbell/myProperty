import { Document } from "$lib/server/models/entity/document/Document";
import type { IDocument } from "$lib/server/models/entity/document/IDocument";
import { DocType, DocumentType } from "$lib/server/models/entity/document_type/DocType";
import type { IDocType } from "$lib/server/models/entity/document_type/IDocType";
import { Repository, type QueryRunner } from "typeorm";

export class DocumentTypeRepository extends Repository<IDocType> {

    constructor(queryRunner: QueryRunner) {
        super(DocType, queryRunner.manager);
    }

     async findByName(doc:DocumentType): Promise<IDocType> {
            console.log("here");
            const result = await this.findOne({ where: { name: doc } });
            if (!result) {
                throw new Error(`Document with name ${doc} not found`);
            }
            return result;
        }
}