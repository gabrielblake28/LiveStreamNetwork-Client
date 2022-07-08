import { IUser } from "./IUser";

export default interface IUserAPI {
  GetOrCreateUser(accessToken: string): Promise<IUser>;
  GetUser(id: string): Promise<IUser>;
}
