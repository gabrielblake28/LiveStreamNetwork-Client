import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";
import { IEvent } from "./IEvent";
import IEventAPI from "./IEventAPI";

export class EventAPI implements IEventAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? ""
          : "http://localhost:3500/event",
    });
  }

  async CreateEvent(resource: IEvent): Promise<string> {
    const result = await this.query.post("/", resource);
    return result.data;
  }
  async GetEvent(id: string): Promise<IEvent> {
    const result = await this.query.get(`/${id}`);
    return result.data;
  }
  async UpdateEvent(id: string, resource: IEvent): Promise<IEvent> {
    const result = await this.query.put(`/${id}`, resource);
    return result.data;
  }
  async DeleteEvent(id: string): Promise<void> {
    const result = await this.query.delete(`/${id}`);
    return result.data;
  }
  async GetLiveEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/live", { params: { limit, page } });
    return result.data;
  }
  async GetFeaturedEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/featured", {
      params: { limit, page },
    });
    return result.data;
  }
  async GetTrendingEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/trending", {
      params: { limit, page },
    });
    return result.data;
  }
  async GetSponsoredEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/sponsored", {
      params: { limit, page },
    });
    return result.data;
  }
  async GetUpcomingEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/upcoming", {
      params: { limit, page },
    });
    return result.data;
  }
  async GetEventsWithMatchingUserIds(
    limit: number,
    page: number,
    userIds: string[]
  ): Promise<IEvent[]> {
    throw new Error("Method not implemented.");
  }
  async GetEventsByTwitchCategory(
    category_id: string,
    limit: number,
    page: number
  ): Promise<IEvent[]> {
    throw new Error("Method not implemented.");
  }
}
