import { usersService } from "../services/users";
import {NextFunction, Request, Response} from "express";

export const userController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const tasks = await usersService.getAll();
    res.json(tasks);
  },

  findById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id) ? -1 : Number.parseInt(req.params.id ?? '-1');
    const task = await usersService.findById(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(await usersService.create(req.body));
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(await usersService.update(req.body.id, req.body));
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Array.isArray(req.params.id) ? -1 : Number.parseInt(req.params.id ?? '-1');
    res.json(await usersService.delete(id));
  },
}