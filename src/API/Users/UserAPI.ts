import axios, { AxiosInstance } from "axios";
import IUserAPI from "./IUserAPI";
import { IUser } from "./IUser";

export class UserAPI implements IUserAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? "https://www.api.livestreamnetwork.tv/user"
          : "http://localhost:3500/user",
    });
  }

  async GetUser(id: string): Promise<IUser> {
    const result = await this.query.get(`/${id}`);
    return result.data;
  }
  async GetOrCreateUser({
    access_token,
    refresh_token,
  }: TwitchAuthPayload): Promise<IUser> {
    return await (
      await axios.post(
        process.env.NODE_ENV == "production"
          ? "https://www.api.livestreamnetwork.tv/auth"
          : "http://localhost:3500/auth",
        {
          access_token,
          refresh_token,
        }
      )
    ).data;
  }
}

export type TwitchAuthPayload = {
  access_token?: string;
  refresh_token?: string;
};
