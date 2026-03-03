"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const tasks = [
    { id: 1, title: "Изучить Express", completed: false, createdAt: Date.now() },
    { id: 2, title: "Написать API", completed: false, createdAt: Date.now() },
];
let nextId = 3;
exports.tasksService = {
    async getAll() {
        return tasks;
    },
    async findById(id) {
        return tasks.find((task) => task.id === id);
    },
    async create(data) {
        const task = {
            id: nextId++,
            title: data.title,
            completed: false,
            createdAt: Date.now(),
        };
        tasks.push(task);
        return task;
    },
    async update(id, data) {
        const task = await this.findById(id);
        if (!task)
            return null;
        if (data.title !== undefined)
            task.title = data.title;
        if (data.completed !== undefined)
            task.completed = data.completed;
        return task;
    },
    async delete(id) {
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1)
            return false;
        tasks.splice(index, 1);
        return true;
    },
};
//# sourceMappingURL=tasks.js.map