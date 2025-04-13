import { Document } from "$lib/server/models/entity/document/Document";
import type { IDocument } from "$lib/server/models/entity/document/IDocument";
import { Repository, type QueryRunner } from "typeorm";

export class DocumentRepository extends Repository<IDocument> {

    constructor(queryRunner: QueryRunner) {
        super(Document, queryRunner.manager);
    }
}