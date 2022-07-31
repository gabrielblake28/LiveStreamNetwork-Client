import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";
import { IEvent, toFormData } from "./IEvent";
import IEventAPI from "./IEventAPI";
import { IEventPayload } from "./IEventPayload";

export class EventAPI implements IEventAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? "http://localhost:3500/event"
          : "http://localhost:3500/event",
    });
  }

  async CreateEvent(resource: IEventPayload): Promise<string> {
    const formData = new FormData();

    toFormData(formData, resource.event);
    formData.append("file", resource.image);

    const result = await this.query.post("/", formData, {
      headers: { ContentType: "multipart/form-data" },
    });
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

  async GetFeaturedEvents(
    limit: number,
    page: number,
    user_id: string
  ): Promise<IEvent[]> {
    const result = await this.query.get("/featured", {
      params: { limit, page, user_id },
    });
    return result.data;
  }

  async GetTrendingEvents(
    limit: number,
    page: number,
    user_id: string
  ): Promise<IEvent[]> {
    const result = await this.query.get("/trending", {
      params: { limit, page, user_id },
    });
    return result.data;
  }

  async GetSponsoredEvents(limit: number, page: number): Promise<IEvent[]> {
    const result = await this.query.get("/sponsored", {
      params: { limit, page },
    });
    return result.data;
  }

  async GetUpcomingEvents(
    limit: number,
    page: number,
    user_id: string
  ): Promise<IEvent[]> {
    const result = await this.query.get("/", {
      params: { limit, page, user_id },
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

  async GetSubscribedEvents(user_id: string): Promise<IEvent[]> {
    const result = await this.query.get(`/subscribed/${user_id}`);
    return result.data;
  }
}
