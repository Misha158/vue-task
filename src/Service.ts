import axios, { AxiosError } from "axios";
import type { TodoItem, User } from "@/types";

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
  static async getTodos(): Promise<TodoItem[] | undefined> {
    try {
      const { data } = await axios.get<TodoItem[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    } catch (error) {
      alert("Todos error");
      console.error("todos error", (error as AxiosError).message);
    }
  }
}
