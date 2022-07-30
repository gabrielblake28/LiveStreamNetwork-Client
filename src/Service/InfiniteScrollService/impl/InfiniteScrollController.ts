import { IEvent } from "../../../API/Events/IEvent";
import { ScreenSizeConstants } from "../../CarouselService/impl/CarouselController";
import { ElementverticalPosition } from "../def/ElementPosition";
import { IEventProvider } from "../def/IEventProvider";

export class InfiniteScrollController {
  EventProvider: IEventProvider;
  MaxElementsToRender?: number;

  private _containerWidth: number;
  get ContainerWidth(): number {
    return this._containerWidth;
  }
  private set ContainerWidth(width: number) {
    this._containerWidth = width;
    this._limit =
      ScreenSizeConstants.GetNumberOfEventsPerSlide(this._containerWidth) *
      this.rowsToRender;
  }

  private _currentPage: number;
  get CurrentPage(): number {
    return this._currentPage;
  }

  private _limit: number;
  get Limit(): number {
    return this._limit;
  }

  private elements: IEvent[] = [];

  private readonly rowsToRender = 6;

  constructor(
    eventProvider: IEventProvider,
    containerWidth: number,
    maxElementsToRender = Infinity
  ) {
    this.EventProvider = eventProvider;
    this.MaxElementsToRender = maxElementsToRender;
    this._containerWidth = containerWidth;
    this._currentPage = 0;
    this._limit =
      ScreenSizeConstants.GetNumberOfEventsPerSlide(this._containerWidth) *
      this.rowsToRender;
  }

  IsPageInViewPort(
    ViewPortPosition: ElementverticalPosition,
    PagePosition: ElementverticalPosition
  ) {
    return (
      ViewPortPosition.Height + ViewPortPosition.PositionY >=
        PagePosition.PositionY &&
      PagePosition.Height + PagePosition.PositionY >= ViewPortPosition.PositionY
    );
  }

  ShouldGetPage(): boolean {
    if (this.elements && this.MaxElementsToRender) {
      if (this.elements.length <= this.MaxElementsToRender) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  async NextPage(): Promise<IEvent[]> {
    return await this.getPage(this._currentPage++);
  }

  private async getPage(page: number): Promise<IEvent[]> {
    const events = await this.EventProvider.ProvideEvents(page, this.Limit);

    this.addEvents(events);

    return events;
  }

  async CalculatePagesOnScreenResize(screenWidth: number): Promise<IEvent[][]> {
    this.ContainerWidth = screenWidth;
    if (Math.floor(this.elements.length / this.Limit) < 1) {
      this._currentPage = 0;
      this.elements = await this.getPage(0);

      return [this.elements];
    } else if (Math.floor(this.elements.length / this.Limit) == 1) {
      this._currentPage = 0;
    } else {
      this._currentPage = Math.floor(this.elements.length / this.Limit);
    }

    this.elements = this.elements.slice(
      0,
      this._currentPage == 0 ? this.Limit : this.Limit * this._currentPage
    );

    await this.NextPage();

    const events: IEvent[][] = [];
    for (
      let iteration = 0;
      iteration * this.Limit < this.elements.length;
      iteration++
    ) {
      events.push(
        this.elements.slice(
          iteration * this.Limit,
          iteration * this.Limit + this.Limit
        )
      );
    }

    return events;
  }

  private addEvents(elements: IEvent[]) {
    this.elements = ([] as IEvent[]).concat(this.elements, elements);
  }
}

export enum InfiniteScrollState {
  Idle,
  Loading,
}
