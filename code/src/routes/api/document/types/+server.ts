
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";
import {DocumentType } from "$lib/server/models/entity/document_type/DocType";


export const GET = processAPIRequest(async ({ params }) => {
    
    //convert the enum of the doctype to a list of strings
    const docTypeList = Object.values(DocumentType);

    return json({
        status: 200,
        body: {
            types: docTypeList
        }
    });
});