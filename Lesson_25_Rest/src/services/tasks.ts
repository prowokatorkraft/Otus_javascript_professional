import {Task} from "../models/types/task";

const tasks: Task[] = [
  { id: 1, title: "Изучить Express", completed: false, createdAt: Date.now() },
  { id: 2, title: "Написать API", completed: false, createdAt: Date.now() },
];
let nextId = 3;

export const tasksService = {
  async getAll(): Promise<Task[]> {
    return tasks;
  },

  async findById(id: number): Promise<Task | undefined> {
    return tasks.find((task) => task.id === id);
  },

  async create(data: Task): Promise<Task> {
    const task = {
      id: nextId++,
      title: data.title,
      completed: false,
      createdAt: Date.now(),
    };
    tasks.push(task);
    return task;
  },

  async update(id: number, data: Task): Promise<Task | null> {
    const task = await this.findById(id);
    if (!task) return null;

    task.title = data.title;
    task.completed = data.completed;

    return task;
  },

  async delete(id: number): Promise<boolean> {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  },
};