import { IEvent } from "../Events/IEvent";
import { IUser } from "../Users/IUser";

export interface SearchResult {
  Identifier: "users" | "events";
  Result: Partial<IUser>[] | Partial<IEvent>[];
}
