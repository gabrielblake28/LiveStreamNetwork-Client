import { HighlightSharp } from "@mui/icons-material";
import axios, { AxiosInstance } from "axios";
import { ISubscriptionAPI } from "./ISubscriptionAPI";
import { Subscription } from "./Subscription";

export class SubscriptionAPI implements ISubscriptionAPI {
  private readonly query: AxiosInstance;

  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? ""
          : "http://localhost:3500/subscription",
    });
  }
  async addSubscription(resource: Subscription): Promise<string> {
    const result = await this.query.post("/", resource);

    return result.data;
  }
  async removeSubscription(subscription_id: string): Promise<void> {
    await this.query.delete(`/${subscription_id}`);
  }

  async getSubscription(subscription_id: string): Promise<Subscription> {
    const result = await this.query.get(`/${subscription_id}`);

    return result.data;
  }

  async BatchGetSubscriptions(eventIds: string[]): Promise<Subscription[]> {
    const result = await this.query.get(`/`, { params: { eventIds } });

    return result.data;
  }

  async BatchClearSubscriptions(eventIds: string[]): Promise<void> {
    await this.query.delete(`/`, { params: { eventIds } });
  }
}
