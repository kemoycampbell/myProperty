import { writable } from "svelte/store";
import type { DataSource } from "typeorm";

// Store to hold the database instance
export const dbInstance = writable<DataSource | null>(null);