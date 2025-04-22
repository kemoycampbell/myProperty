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
import path from 'path';
import type { UnitService } from "$lib/server/services/unitService";
import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";

// Obtener __dirname en módulos ES
const __dirname = path.dirname(new URL(import.meta.url).pathname);

describe("DocumentService Tests", () => {
    let documentService: DocumentService;
    let documentRepository: Partial<DocumentRepository>;
    let unitService: Partial<UnitService>;
    let userService: Partial<UserService>;

    let fakeUser: IUser;
    let fakeDocument: IDocument;
    let fakeUnit: IUnit;
    let fakeProperty: IProperty;

    beforeEach(() => {
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
            docType: fakeDocType,
        };

        fakeUser = {
            id: "123456",
            email: "test@test.com",
            username: "testuser",
            password: "password",
            role: fakeRole,
            firstName: "Test",
            lastName: "User",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

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
            updatedAt: new Date(),
        };

        fakeUnit = {
            id: "123456",
            number: 123,
            property: fakeProperty,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        documentRepository = {
            save: vi.fn().mockResolvedValue(fakeDocument),
            find: vi.fn().mockResolvedValue([fakeDocument]),
            findOne: vi.fn().mockResolvedValue(fakeDocument),
            create: vi.fn().mockReturnValue(fakeDocument),
        };

        userService = {
            getById: vi.fn().mockResolvedValue(fakeUser),
        };

        unitService = {
            getById: vi.fn().mockResolvedValue(fakeUnit),
        };

        documentService = new DocumentService(
            documentRepository as DocumentRepository,
            userService as UserService,
            unitService as UnitService
        );
    });

    describe("getDocumentById", () => {
        it("should throw an error if id is not provided", async () => {
            await expect(documentService.getDocumentById("")).rejects.toThrowError(
                new UserException("Document ID is required")
            );
        });

        it("should throw an error if document is not found", async () => {
            (documentRepository.findOne as Mock).mockResolvedValueOnce(null);
            await expect(documentService.getDocumentById("123")).rejects.toThrowError(
                new UserException("Document not found")
            );
        });

        it("should return the document if found", async () => {
            const result = await documentService.getDocumentById("123456");
            expect(result).toBeDefined();
            expect(result.id).toBe("123456");
            expect(result).toBe(fakeDocument);
        });
    });

    describe("getDocumentsByOwnerId", () => {
        it("should throw an error if ownerId is not provided", async () => {
            await expect(documentService.getDocumentsByOwnerId("")).rejects.toThrowError(
                new UserException("Owner ID is required")
            );
        });

        it("should return an empty array if no documents are found", async () => {
            (documentRepository.find as Mock).mockResolvedValueOnce([]);
            const result = await documentService.getDocumentsByOwnerId("123456");
            expect(result).toBeDefined();
            expect(result.length).toBe(0);
        });

        it("should return the documents if found", async () => {
            const result = await documentService.getDocumentsByOwnerId("123456");
            expect(result).toBeDefined();
            expect(result[0].owner).toBe("123456");
            expect(result[0]).toBe(fakeDocument);
        });
    });

    describe("showDocument", () => {
        it("should throw an error if id is not provided", async () => {
            await expect(documentService.showDocument("", "123", RoleType.OWNER)).rejects.toThrowError(
                new UserException("Document ID is required")
            );
        });

        it("should throw an error if role is not provided", async () => {
            await expect(documentService.showDocument("123", "123", "")).rejects.toThrowError(
                new UserException("Role is required")
            );
        });

        it("should throw an error if document is not found", async () => {
            (documentRepository.findOne as Mock).mockResolvedValueOnce(null);
            await expect(documentService.showDocument("123", "123", RoleType.OWNER)).rejects.toThrowError(
                new UserException("Document not found")
            );
        });

        // it("should return the base64 file content if document is found", async () => {
        //     const mockFilePath = path.resolve(__dirname, "test-file.txt"); // Usar path.resolve para evitar problemas de rutas
        //     const mockFileContent = "Hello, world!";
            
        //     // Crear el archivo temporal
        //     await fs.promises.writeFile(mockFilePath, mockFileContent);
        
        //     // Simular el documento encontrado
        //     (documentRepository.findOne as Mock).mockResolvedValueOnce({
        //         ...fakeDocument,
        //         path: mockFilePath, // Usar la ruta completa del archivo
        //     });
        
        //     // Llamar al método showDocument
        //     const result = await documentService.showDocument("123456", "123456", RoleType.OWNER);
        //     expect(result).toBeDefined();
        //     expect(Buffer.from(result, "base64").toString()).toBe(mockFileContent);
        
        //     // Limpiar el archivo temporal
        //     await fs.promises.unlink(mockFilePath);
        // });
    });

    describe("upload", () => {
        it("should throw an error if file is not provided", async () => {
            await expect(documentService.upload("")).rejects.toThrowError(
                new UserException("file is required!")
            );
        });

        it("should throw an error if file type is not allowed", async () => {
            const invalidBase64File = Buffer.from("invalid file").toString("base64");
            await expect(documentService.upload(invalidBase64File)).rejects.toThrowError(
                new UserException(
                    "File type not allowed. Allowed file types are: application/pdf, image/jpeg, image/png, application/msword, application/docx"
                )
            );
        });

        // it("should upload the file successfully if valid", async () => {
        //     // Simular un archivo PDF válido con una cabecera real
        //     const validBase64File = Buffer.from("%PDF-1.4\n%Hello, this is a simulated PDF file").toString("base64");
        
        //     // Mockear las operaciones de escritura y lectura de archivos
        //     vi.spyOn(fs.promises, "writeFile").mockResolvedValue(undefined);
        //     vi.spyOn(fs.promises, "readFile").mockResolvedValue(Buffer.from("%PDF-1.4\n%Hello, this is a simulated PDF file"));
        
        //     // Llamar al método upload
        //     const result = await documentService.upload(`data:application/pdf;base64,${validBase64File}`);
        //     expect(result).toContain("uploads/");
        // });
    });

    describe("createDocument", () => {
        it("should throw an error if owner id is not provided", async () => {
            await expect(
                documentService.createDocument("", "123", "123", "base64-valid-file")
            ).rejects.toThrowError(new UserException("Owner id is required"));
        });

        it("should throw an error if tenant id is not provided", async () => {
            await expect(
                documentService.createDocument("123", "", "123", "base64-valid-file")
            ).rejects.toThrowError(new UserException("Tenant id is required"));
        });

        it("should throw an error if unit id is not provided", async () => {
            await expect(
                documentService.createDocument("123", "123", "", "base64-valid-file")
            ).rejects.toThrowError(new UserException("Unit id is required"));
        });

        it("should throw an error if file is not provided", async () => {
            await expect(
                documentService.createDocument("123", "123", "123", "")
            ).rejects.toThrowError(new UserException("file is required!"));
        });

        // it("should create a document successfully when valid data is provided", async () => {
        //     // Simular un archivo PDF válido con una cabecera real
        //     const validBase64File = Buffer.from("%PDF-1.4\n%Hello, this is a simulated PDF file").toString("base64");
        
        //     // Mockear las operaciones de escritura y lectura de archivos
        //     vi.spyOn(fs.promises, "writeFile").mockResolvedValue(undefined);
        //     vi.spyOn(fs.promises, "readFile").mockResolvedValue(Buffer.from("%PDF-1.4\n%Hello, this is a simulated PDF file"));
        
        //     // Llamar al método createDocument
        //     const result = await documentService.createDocument(
        //         "123",
        //         "456",
        //         "789",
        //         `data:application/pdf;base64,${validBase64File}`
        //     );
        
        //     // Verificar el resultado
        //     expect(result).toBeDefined();
        //     expect(result.owner).toBe("123");
        //     expect(result.tenant).toBe("456");
        //     expect(result.unit).toBe("789");
        //     expect(result.path).toContain("uploads/");
        // });
    });

    describe("getDocumentsByUserId", () => {
        it("should throw an error if userId is not provided", async () => {
            await expect(documentService.getDocumentsByUserId("")).rejects.toThrowError(
                new UserException("User ID is required")
            );
        });
    
        it("should throw an error if user is not found", async () => {
            // Mockear que el servicio de usuario no encuentra el usuario
            (userService.getById as Mock).mockResolvedValueOnce(null);
    
            await expect(documentService.getDocumentsByUserId("123")).rejects.toThrowError(
                new UserException("User not found")
            );
        });
    
        it("should return an empty array if no documents are found for the user", async () => {
            // Mockear que el repositorio de documentos no encuentra documentos
            (documentRepository.find as Mock).mockResolvedValueOnce([]);
    
            const result = await documentService.getDocumentsByUserId("123456");
            expect(result).toBeDefined();
            expect(result.length).toBe(0);
        });
    
        it("should return the documents if found for the user", async () => {
            // Mockear que el repositorio de documentos encuentra documentos
            const mockDocuments: IDocument[] = [
                { ...fakeDocument, id: "doc1", owner: "123456" },
                { ...fakeDocument, id: "doc2", owner: "123456" },
            ];
            (documentRepository.find as Mock).mockResolvedValueOnce(mockDocuments);
    
            const result = await documentService.getDocumentsByUserId("123456");
            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result[0].id).toBe("doc1");
            expect(result[1].id).toBe("doc2");
            expect(result[0].owner).toBe("123456");
        });
    });
});