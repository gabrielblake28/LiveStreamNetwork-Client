import { IUser } from "./IUser";

export default interface IUserAPI {
  CreateUser(resource: IUser): Promise<string>;
  GetUser(accessToken: string): Promise<IUser>;
  DeleteUser(id: string): Promise<void>;
}
