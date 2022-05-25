import axios, { AxiosInstance } from "axios";
import IUserAPI from "./IUserAPI";
import { IUser } from "./IUser";

export class UserAPI implements IUserAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? ""
          : "http://localhost:3500/event",
    });
  }

  async CreateUser(resource: IUser): Promise<string> {
    const result = await this.query.post("/", resource);
    return result.data;
  }

  async GetUser(accessToken: string): Promise<IUser> {
    const result = await this.query.get(`/${accessToken}`);
    return result.data;
  }

  async DeleteUser(id: string): Promise<void> {
    const result = await this.query.delete(`/${id}`);
    return result.data;
  }
}
