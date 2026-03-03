import { Task } from "../models/types/task";
export declare const tasksService: {
    getAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | undefined>;
    create(data: Task): Promise<Task>;
    update(id: number, data: Task): Promise<Task | null>;
    delete(id: number): Promise<boolean>;
};
//# sourceMappingURL=tasks.d.ts.map