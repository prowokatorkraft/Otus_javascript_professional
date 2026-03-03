"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const tasks_1 = require("../services/tasks");
exports.taskController = {
    getAll: async (req, res, next) => {
        try {
            const tasks = await tasks_1.tasksService.getAll();
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    findById: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ error: 'Task ID is required' });
                return;
            }
            if (Array.isArray(id)) {
                res.status(400).json({ error: 'Invalid task ID format' });
                return;
            }
            const task = await tasks_1.tasksService.findById(Number.parseInt(id ?? '-1'));
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    create: async (req, res, next) => {
        try {
            if (!req.body) {
                res.status(400).json({ error: 'Request body is required' });
                return;
                // также валидация полей
            }
            const tasks = await tasks_1.tasksService.create(req.body);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    update: async (req, res, next) => {
        try {
            if (!req.body) {
                res.status(400).json({ error: 'Request body is required' });
                return;
                // также валидация полей
            }
            const tasks = await tasks_1.tasksService.update(req.body.id, req.body);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    delete: async (req, res, next) => {
        try {
            if (!req.body.id) {
                res.status(400).json({ error: 'Request body is required' });
                return;
            }
            const tasks = await tasks_1.tasksService.delete(req.body.id);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
//# sourceMappingURL=tasks.js.map