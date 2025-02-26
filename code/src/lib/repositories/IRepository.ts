export interface IRepository<T> {
    getById(id: number): Promise<T>;
    getAll(): Promise<T[]>;
    add(entity: Partial<T>): Promise<T>;
    update(entity: T): Promise<T>;
    delete(entity: T): Promise<void>;
}