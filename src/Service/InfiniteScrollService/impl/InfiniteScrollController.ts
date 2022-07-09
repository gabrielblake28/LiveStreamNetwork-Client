import { IEvent } from "../../../API/Events/IEvent";
import { IEventProvider } from "../def/IEventProvider";

export class InfiniteScrollController {
  EventProvider: IEventProvider;

  constructor(eventProvider: IEventProvider) {
    this.EventProvider = eventProvider;
  }

  GetPage(page: number, limit: number): IEvent[] {
    return this.EventProvider.ProvideEvents(page, limit);
  }
}
