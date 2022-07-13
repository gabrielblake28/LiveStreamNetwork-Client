import { EventAPI } from "../../../API/Events/EventAPI";
import { IEventProvider } from "../def/IEventProvider";

const eventAPI = new EventAPI();
export class EventProvider implements IEventProvider {
  UserId: string;
  constructor(userId: string) {
    this.UserId = userId;
  }
  async ProvideEvents(page: number, limit: number) {
    return await eventAPI.GetUpcomingEvents(limit, page, this.UserId);
  }
}
