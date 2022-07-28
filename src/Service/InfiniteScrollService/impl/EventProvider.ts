import { EventAPI } from "../../../API/Events/EventAPI";
import { IEvent } from "../../../API/Events/IEvent";
import { IEventProvider } from "../def/IEventProvider";

const eventAPI = new EventAPI();
export class UpcomingEventProvider implements IEventProvider {
  UserId: string;
  constructor(userId: string = "0") {
    this.UserId = userId;
  }
  async ProvideEvents(page: number, limit: number): Promise<IEvent[]> {
    return await eventAPI.GetUpcomingEvents(limit, page, this.UserId);
  }
}
