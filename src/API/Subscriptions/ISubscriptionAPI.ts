import { Subscription } from "./Subscription";

export interface ISubscriptionAPI {
  BatchGetSubscriptions(eventIds: string[]): Promise<Subscription[]>;

  BatchClearSubscriptions(eventIds: string[]): void;

  addSubscription(resource: Partial<Subscription>): Promise<string>;

  removeSubscription(subscription_id: string): Promise<void>;

  getSubscription(subscription_id: string): Promise<Subscription>;

  GetSubscriptionByEventId(
    event_id: string,
    user_id: string
  ): Promise<Subscription>;
}
