import { IEvent } from "../../../API/Events/IEvent";

export interface IEventProvider {
  ProvideEvents(page: number, limit: number): Promise<IEvent[]>;
}
