import { expect } from "chai";
import Sinon from "sinon";
import { Pool } from "pg";
import Database from "$lib/database/database";

describe("Mock testing of the database functions", () => {

    let pool: Sinon.SinonStubbedInstance<Pool>;
    let db: Database;

    // setup before each tests
    beforeEach(() => {
        // create a stub postgres pool
        pool = Sinon.createStubInstance(Pool);

        // create a db
        db = new Database("localhost", 5432, "test_db", "user", "password");

        // replace the actual pool with our stub
        (db as any).pool = pool;
    })

    // teardown after each tests
    afterEach(() => {
        Sinon.restore(); // restore the original methods after each tests
    })

    it("should successfully insert data into the table", async () => {
        const totalRowInsert = { rowCount: 1 };
        const table = "users";
        const columns = ["name", "email"];
        const params = ["John Doe", "johndontknow@dontknow.com"];

        const actual = await db.insert(table, columns, params);

        expect(actual).to.equal(totalRowInsert);
        expect(pool.query.calledOnce).to.be.true;
    });
});
