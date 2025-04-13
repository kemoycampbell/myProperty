import { UserException } from "$lib/server/exceptions/UserException";
import type { IDocument } from "$lib/server/models/entity/document/IDocument";
import { DocType, DocumentType } from "$lib/server/models/entity/document_type/DocType";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { DocumentRepository } from "$lib/server/repositories/document/DocumentRepository";
import { DocumentService } from "$lib/server/services/documentService";
import type { UserService } from "$lib/server/services/userService";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import fs from 'fs';
import { base } from "$app/paths";
import type { UnitService } from "$lib/server/services/unitService";
import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";

describe("DocumentService Tests", () => {

    let documentService:DocumentService;
    let documentRepository:Partial<DocumentRepository>;
    let unitService:Partial<UnitService>;
    let userService:Partial<UserService>;


    let fakeUser:IUser;
    let fakeDocument:IDocument;
    let fakeUnit: IUnit;
    let fakeProperty: IProperty



    beforeEach(()=>{

        //fake values
        const fakeDocType = new DocType();
        fakeDocType.name = DocumentType.LEASE_AGREEMENT;
    
    
        const fakeRole = new Role();
        fakeRole.name = RoleType.OWNER;
    
        fakeDocument = {
            id: "123456",
            owner: "123456",
            tenant: "123456",
            unit: "123456",
            createdAt: new Date(),
            updatedAt: new Date(),
            path: "",
            docType: fakeDocType
        }
    
        fakeUser = {
            id: "123456",
            email: "iWantToSeeTheManager@karen.com",
            username: "karen",
            password: "password",
            role: fakeRole,
            firstName: "Karen",
            lastName: "Karenson",
            createdAt: new Date(),
            updatedAt: new Date()
        } 


        fakeUser = {
            id: "123456",
            email: "iWantToSeeTheManager@karen.com",
            username: "karen",
            password: "password",
            role: fakeRole,
            firstName: "Karen",
            lastName: "Karenson",
            createdAt: new Date(),
            updatedAt: new Date()
        } 

        fakeProperty = {
            id: "123456",
            owner: fakeUser,
            name: "test",
            address_line1: "1234 test st",
            address_line2: "",
            city: "test",
            state: "test",
            zip: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        fakeUnit = {
            id: "123456",
            number: 123,
            property: fakeProperty,
            createdAt: new Date(),
            updatedAt: new Date()
        }



        //we want to mock the document repository
        documentRepository = {
            save: vi.fn().mockResolvedValue(fakeDocument),
            find: vi.fn().mockResolvedValue([fakeDocument]),
            findOne: vi.fn().mockResolvedValue(fakeDocument),

        }

        userService = {
            getById: vi.fn().mockResolvedValue(fakeUser)
        }

        unitService = {
            getById: vi.fn().mockResolvedValue(fakeUnit)
        }
        documentService = new DocumentService(documentRepository as DocumentRepository, userService as UserService, unitService as UnitService);
    })

    describe("getDocumentById", () => {
        it('should throw an error if id is not provided', async () => {
            const id = "";

            const result = documentService.getDocumentById(id);
            await expect(result).rejects.toThrowError(
                new UserException("Document ID is required", 400)
            );
        });

        it('should throw an error if document is not found', async () => {
            //mock the repository to return null
            (documentRepository.findOne as Mock).mockResolvedValueOnce(null);

            const id = "123";
            const result = documentService.getDocumentById(id);
            await expect(result).rejects.toThrowError(
                new UserException("Document not found", 400)
            );
        });

        it('should return the document if found', async () => {
            const id = "123456";
            const result = await documentService.getDocumentById(id);
            expect(result).toBeDefined();
            expect(result.id).toBe(id);

            expect(result).toBe(fakeDocument);
        });
    })

    describe("getDocumentsByUserId", () => {
        it('should throw an error if userId is not provided', async () => {
            const userId = "";

            const result = documentService.getDocumentsByUserId(userId);
            await expect(result).rejects.toThrowError(
                new UserException("User ID is required", 400)
            );
        });

        it('should throw an error if user is not found', async () => {
            //mock the repository to return null
            (userService.getById as Mock).mockResolvedValueOnce(null);

            const userId = "123";
            const result = documentService.getDocumentsByUserId(userId);
            await expect(result).rejects.toThrowError(
                new UserException("User not found", 400)
            );
        });

        it('should return the documents if found', async () => {
            const userId = "123456";
            const result = await documentService.getDocumentsByUserId(userId);
            expect(result).toBeDefined();
            expect(result[0].owner).toBe(userId);

            expect(result[0]).toBe(fakeDocument);
        });
    });

    describe("upload", () => {
        it('should throw an error if file is not provided', async () => {
            const file = "";

            const result = documentService.upload(file);
            await expect(result).rejects.toThrowError(
                new UserException("file is required!", 400)
            );
        });

        it('should throw an error if file type is not allowed', async () => {
            const file = "IA=="; //not a valid type

            const result = documentService.upload(file);
            await expect(result).rejects.toThrowError(
                new UserException("File type not allowed. Allowed file types are: application/pdf, image/jpeg, image/png, application/msword, application/docx", 400)
            );
        });

        it('should return the document if file is valid', async () => {
            const base64File = fs.readFileSync("src/tests/document/lease.txt", 'utf8');

            const result = await documentService.upload(base64File);
            expect(result).toBeDefined();
            expect(result).toContain("uploads/");
            expect(result).toContain(".pdf");;
        });
    });

    describe("createDocument", () => {
        it('should throw an error if the owner id is not provided', async () => {
            const owner = "";
            const tenant = "123";
            const unit = "123";
            const base64File = fs.readFileSync("src/tests/document/lease.txt", 'utf8');

            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError(UserException);

            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError("Owner id is required");
        });

        it('should throw an error if the tenant id is not provided', async () => {
            const owner = "123";
            const tenant = "";
            const unit = "123";
            const base64File = fs.readFileSync("src/tests/document/lease.txt", 'utf8');

            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError(UserException);

            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError("Tenant id is required");
        });

        it('should throw an error if the unit id is not provided', async () => {
            const owner = "123";
            const tenant = "123";
            const unit = "";
            const base64File = fs.readFileSync("src/tests/document/lease.txt", 'utf8');
            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError(UserException);
            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError("Unit id is required");
        });

        it('should throw an error if the file is not provided', async () => {
            const owner = "123";
            const tenant = "123";
            const unit = "123";
            const base64File = "";
            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError(UserException);
            await expect(documentService.createDocument(owner, tenant, unit, base)).rejects.toThrowError("file is required!");

        });
    });

   
});