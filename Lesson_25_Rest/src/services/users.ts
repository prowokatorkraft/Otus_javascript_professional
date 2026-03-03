import {User} from "../models/types/user";

const Users: User[] = [
  { id: 1, name: "Danil", age: 31 },
  { id: 2, name: "Ludmila", age: 30 },
];
let nextId = 3;

export const usersService = {
  async getAll(): Promise<User[]> {
    return Users;
  },

  async findById(id: number): Promise<User | undefined> {
    return Users.find((User) => User.id === id);
  },

  async create(data: User): Promise<User> {
    const User = {
      id: nextId++,
      name: data.name,
      age: data.age,
    };
    Users.push(User);
    return User;
  },

  async update(id: number, data: User): Promise<User | null> {
    const User = await this.findById(id);
    if (!User) return null;

    User.name = data.name;
    User.age = data.age;

    return User;
  },

  async delete(id: number): Promise<boolean> {
    const index = Users.findIndex((User) => User.id === id);
    if (index === -1) return false;

    Users.splice(index, 1);
    return true;
  },
};