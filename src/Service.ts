import axios, { AxiosError } from "axios";
import type { TodoItem, User } from "@/types";

const convertStatusFilter = (status?: string) => {
  if (status === "all") return undefined;
  if (status === "completed") return true;
  if (status === "uncompleted") return false;
  if (status === "favorites") return undefined;
  return undefined;
};

const convertUserIdFilter = (userId?: string | number) => {
  if (userId === "All users") return undefined;

  return userId;
};

export class Service {
  static async getUsers(): Promise<User[] | undefined> {
    try {
      const { data } = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return data;
    } catch (error) {
      alert("Get users error");
      console.error("Get users error", (error as AxiosError).message);
    }
  }
  static async getTodos(payload: {
    filters?: {
      status?: string;
      userId?: string;
      title?: string;
    };
  }): Promise<TodoItem[] | undefined> {
    try {
      const { data } = await axios.get<TodoItem[]>(
        "https://jsonplaceholder.typicode.com/todos",
        {
          params: {
            completed: convertStatusFilter(payload?.filters?.status),
            userId: convertUserIdFilter(payload?.filters?.userId),
            q: payload?.filters?.title,
          },
        }
      );
      return data;
    } catch (error) {
      alert("Todos error");
      console.error("todos error", (error as AxiosError).message);
    }
  }
  static async createTodo(newTodo: {
    title: string;
    userId: number;
    completed: boolean;
  }) {
    try {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          data: newTodo,
        }
      );
      alert("Congrats, new todo has been created!");
      return data;
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
}
