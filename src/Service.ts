import axios, { AxiosError } from "axios";
import type { User } from "@/types";

export class Service {
  static async getUsers(): Promise<User[] | undefined> {
    try {
      const { data } = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log("Data", data);
      return data;
    } catch (error) {
      alert("login error");
      console.error("login error", (error as AxiosError).message);
    }
  }
}
