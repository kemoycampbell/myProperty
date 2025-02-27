import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Sinon from "sinon";
import Database from "$lib/database/database";  // Adjust import based on actual file path
import { DataSource} from "typeorm";

describe("Mock testing of the database functions", () => {

    let db: Database;
    let dataSource: Sinon.SinonStubbedInstance<DataSource>;
    let host: string;
    let port: number;
    let database: string;
    let user: string;
    let password: string;

    // Setup before tests
    beforeAll(() => {
        // create a stubbed Postgres pool
        dataSource = Sinon.createStubInstance(DataSource);

        // Stub methods
        (dataSource.initialize as Sinon.SinonStub).resolves();  // Resolves without throwing
        (dataSource.destroy as Sinon.SinonStub).resolves(); // when called, it should resolve and destroy

        // Stub the `isInitialized` property
        Object.defineProperty(dataSource, "isInitialized", { get: () => true }); // Set initialized as true via getter

        host = "localhost";
        port = 5432;
        database = "test";
        user = "test";
        password = "test";

        // create the db class instance
        db = new Database(host, port, database, user, password, false);

        // set the source to the stubbed source
        db["source"] = dataSource;
    });

    // Teardown after the tests
    afterAll(() => {
        Sinon.restore(); // restore the original methods after each test
    });

    it("should initialize the connection", async () => {
        await db.initialize();
        expect(dataSource.initialize.calledOnce).toBe(true);
    });

    it("should close the connection", async () => {
        await db.close();
        expect(dataSource.destroy.calledOnce).toBe(true);
    });

    it("should return the source", async () => {
        expect(db.getSource()).toBe(dataSource);
    });

    it("should configure empty entities and migrations", async () => {
        // probably want to replace any with an actual type
        const entities: any[] = [];
        const migrations: (string | Function)[] = [];

        db.configure(entities, migrations);

        expect(dataSource.setOptions.calledOnce).toBe(true);
        expect(dataSource.setOptions.calledWith({ entities: entities, migrations: migrations }));
    });
});
