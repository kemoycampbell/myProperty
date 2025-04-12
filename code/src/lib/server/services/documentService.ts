import { UserException } from "../exceptions/UserException";
import type { IDocument } from "../models/entity/document/IDocument";
import type { DocumentRepository } from "../repositories/document/DocumentRepository";
import type { UserService } from "./userService";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


import {fileTypeFromBuffer} from 'file-type';

export class DocumentService {
    private documentRepository: DocumentRepository;
    private userService: UserService;

    private allowedFileTypes: string[];

    constructor(documentRepository: DocumentRepository, userService: UserService) {
        this.documentRepository = documentRepository;
        this.userService = userService;

        this.allowedFileTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "application/msword",
            "application/docx",
        ]
    }

    async getDocumentById(id: string): Promise<IDocument> {
        if(!id) {
            throw new UserException("Document ID is required");
        }

        const document = await this.documentRepository.findOne({ where: { id } });
        if(!document) {
            throw new UserException("Document not found");
        }

        return document;
    }

    async getDocumentsByUserId(userId: string): Promise<IDocument[]> {
        if(!userId) {
            throw new UserException("User ID is required");
        }

        const user = await this.userService.getById(userId);
        if(!user) {
            throw new UserException("User not found");
        }

        const documents = await this.documentRepository.find({ where: { owner: user.id } });
        return documents;
    }

    async upload(base64File:string) {
        if(!base64File) {
            throw new UserException("file is required!");
        }
    
        //store the file in a buffer
        const buffer  = Buffer.from(base64File, 'base64');

        //get the file type
        const type = await fileTypeFromBuffer(buffer);

        if(!type) {
            throw new UserException("An error occurred detecting the file type. Please try again");
        }

        //check if the file type is allowed
        const isAllowed = this.allowedFileTypes.includes(type.mime);
        if(!isAllowed) {
            throw new UserException("File type not allowed. Allowed file types are: " + this.allowedFileTypes.join(", "));
        }



        // Save the file to the server (this is just an example, you should implement your own logic)
        const filename = uuidv4() + '.' + type.ext;
        const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

        await fs.writeFile(filePath, buffer);
        const isSaved = await fs.readFile(filePath);
        if(!isSaved) {
            throw new UserException("An error occurred saving the file. Please try again");
        }

        return filePath;
    }

    async createDocument(owner: string, tenant: string, property: string, base64File:string): Promise<IDocument> {
        if(!owner) {
            throw new UserException("Owner id is required");
        }
        if(!tenant) {
            throw new UserException("Tenant id is required");
        }
        if(!property) {
            throw new UserException("Property id is required");
        }

        //attempt to save the file
        const path = await this.upload(base64File);

        const document = await this.documentRepository.create({
            owner,
            tenant,
            property,
            path
        });

        return await this.documentRepository.save(document);
    }

}