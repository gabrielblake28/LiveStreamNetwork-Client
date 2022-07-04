import { IEvent } from "./IEvent";
import { IEventPayload } from "./IEventPayload";

export default interface IEventAPI {
  CreateEvent(resource: IEventPayload): Promise<string>;
  GetEvent(id: string): Promise<IEvent>;
  UpdateEvent(id: string, resource: IEvent): Promise<IEvent>;
  DeleteEvent(id: string): Promise<void>;
  GetLiveEvents(limit: number, page: number): Promise<IEvent[]>;
  GetFeaturedEvents(
    limit: number,
    page: number,
    user_id: string
  ): Promise<IEvent[]>;
  GetTrendingEvents(limit: number, page: number): Promise<IEvent[]>;
  GetSponsoredEvents(limit: number, page: number): Promise<IEvent[]>;
  GetUpcomingEvents(limit: number, page: number): Promise<IEvent[]>;
  GetEventsWithMatchingUserIds(
    limit: number,
    page: number,
    userIds: string[]
  ): Promise<IEvent[]>;
  GetEventsByTwitchCategory(
    category_id: string,
    limit: number,
    page: number
  ): Promise<IEvent[]>;
}
