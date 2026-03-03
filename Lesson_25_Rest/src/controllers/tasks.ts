import { tasksService } from "../services/tasks";
import {NextFunction, Request, Response} from "express";

export const taskController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tasks = await tasksService.getAll();
    res.json(tasks);
  },

  findById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id) ? -1 : Number.parseInt(req.params.id ?? '-1');
    const task = await tasksService.findById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(await tasksService.create(req.body));
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(await tasksService.update(req.body.id, req.body));
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id) ? -1 : Number.parseInt(req.params.id ?? '-1');
    res.json(await tasksService.delete(id));
  },
}