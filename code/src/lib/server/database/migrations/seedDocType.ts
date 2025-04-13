import { DocType, DocumentType } from "$lib/server/models/entity/document_type/DocType";
import type { DataSource } from "typeorm";

/**
 * This is a function that seeds the roles in the database
 * @param source 
 */
const seedDocTypes = async(source: DataSource) => {
    const repository = source.getRepository(DocType);
    const docTypes = Object.values(DocumentType).map((type) => ({ name: type }));

    await repository
    .createQueryBuilder()
    .insert()
    .into(DocType)
    .values(docTypes)
    .orIgnore()
    .execute();
};

export default seedDocTypes;