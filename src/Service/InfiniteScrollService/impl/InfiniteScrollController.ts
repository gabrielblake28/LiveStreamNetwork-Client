import { TrendingUpOutlined } from "@mui/icons-material";
import { element } from "prop-types";
import { IEvent } from "../../../API/Events/IEvent";
import { ElementPosition } from "../def/ElementPosition";
import { IEventProvider } from "../def/IEventProvider";

export class InfiniteScrollController {
  EventProvider: IEventProvider;

  Limit: number;
  MaxElementsToRender?: number;

  constructor(
    eventProvider: IEventProvider,
    limit = 20,
    maxElementsToRender = undefined
  ) {
    this.EventProvider = eventProvider;
    this.Limit = limit;
    this.MaxElementsToRender = maxElementsToRender;
  }

  IsPageInViewPort(
    ViewPortPosition: ElementPosition,
    PagePosition: ElementPosition
  ) {
    return (
      ViewPortPosition.PositionY + ViewPortPosition.Height >
      PagePosition.PositionY + PagePosition.Height
    );
  }

  ShouldGetPage(elementsCreated?: number): boolean {
    if (elementsCreated && this.MaxElementsToRender) {
      if (elementsCreated < this.MaxElementsToRender) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  async GetPage(page: number): Promise<IEvent[]> {
    const events = this.EventProvider.ProvideEvents(page, this.Limit);

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        resolve(events);
      }, 500);
    });
  }
}

export enum InfiniteScrollState {
  Idle,
  Loading,
}
