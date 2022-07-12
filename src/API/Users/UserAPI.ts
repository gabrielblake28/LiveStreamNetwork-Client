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
          : "http://localhost:3500/user",
    });
  }
  
  async GetUser(id: string): Promise<IUser> {
    const result = await this.query.get(`/${id}`);
    return result.data;
  }
  async GetOrCreateUser(accessToken: string): Promise<IUser> {
    return await (
      await this.query.post("/", { accessToken })
    ).data;
  }
}
