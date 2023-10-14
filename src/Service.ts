import axios, { AxiosError } from "axios";

interface User {
  username: string;
  email: string;
}

export class Service {
  static async getUsers(): Promise<User[] | undefined> {
    try {
      const { data } = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );

      return data;
    } catch (error) {
      alert("login error");
      console.error("login error", (error as AxiosError).message);
    }
  }
}
