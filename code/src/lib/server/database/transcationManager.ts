
import { type QueryRunner } from "typeorm";
import database from "./database";

export class TransactionManager {
    /**
     * Runs a given operation within a transaction.
     * Ensures that all operations inside the transaction are committed together 
     * or rolled back if an error occurs.
     * 
     * @param operation - A function that takes a QueryRunner and executes database operations.
     * @returns The result of the operation if successful.
     */
    static async run<T>(operation: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
      // Create a new QueryRunner instance to manage the transaction
      const queryRunner = database.createQueryRunner();
      
    //   // Establish a database connection for the transaction
    //   await queryRunner.connect();
      
      // Start the transaction
      await queryRunner.startTransaction();
  
      try {
        // Execute the provided operation within the transaction
        const result = await operation(queryRunner);
  
        // Commit the transaction if the operation succeeds
        await queryRunner.commitTransaction();
        return result;
      } catch (error) {
        // Rollback the transaction if any error occurs
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        // Release the QueryRunner to free up resources
        await queryRunner.release();
      }
    }
  }
  