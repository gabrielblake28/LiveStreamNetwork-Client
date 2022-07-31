import { IUser } from "./IUser";
import { TwitchAuthPayload } from "./UserAPI";

export default interface IUserAPI {
  GetOrCreateUser(authPayload: TwitchAuthPayload): Promise<IUser>;
  GetUser(id: string): Promise<IUser>;
}
