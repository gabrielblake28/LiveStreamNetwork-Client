import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import EventCard from "../EventCard/EventCard";
import { ScreenSizeConstants } from "../../Service/CarouselService/impl/CarouselController";
import { useWindowWidth } from "../CustomCarousel/CustomCarousel";
import { InfiniteScrollController } from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";

type InfiniteScrollPageProps = {
  Events: IEvent[];
  ScrollParent: HTMLDivElement;
  ScrollController: InfiniteScrollController;
};

export function InfiniteScrollPage({
  Events,
  ScrollParent,
  ScrollController,
}: InfiniteScrollPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const [rowLength, setRowLength] = useState(
    ScreenSizeConstants.GetNumberOfEventsPerSlide(ScrollParent.clientWidth)
  );

  const PageIsVisible = (
    elementOffsetTop: number,
    elementHeight: number
  ): boolean => {
    if (ScrollParent.scrollTop + ScrollParent.clientHeight < elementOffsetTop) {
      return false;
    } else if (ScrollParent.scrollTop <= elementOffsetTop + elementHeight) {
      return true;
    }

    return false;
  };

  const renderEvents = () => {
    const eventsToRender: JSX.Element[] = [];

    Events?.forEach((event) => {
      eventsToRender.push(
        <div>
          <EventCard Event={event} key={event.event_id!} />
        </div>
      );
    });

    return eventsToRender;
  };

  useLayoutEffect(() => {
    if (ScrollParent) {
      let scrollEvent = () => {
        const scrollY = ScrollParent.scrollTop;
        setTimeout(() => {
          if (scrollY == ScrollParent.scrollTop && ref?.current) {
            setShow(
              ScrollController.IsPageInViewPort(
                {
                  Height: ScrollParent.clientHeight,
                  PositionY: ScrollParent.scrollTop,
                },
                {
                  Height: ref.current.clientHeight,
                  PositionY: ref.current?.offsetTop,
                }
              )
            );
          }
        }, 0);
      };

      let resizeEvent = () => {
        const width = ScrollParent.clientWidth;

        setTimeout(() => {
          if (ScrollParent.clientWidth == width) {
            setRowLength(
              ScreenSizeConstants.GetNumberOfEventsPerSlide(
                ScrollParent.clientWidth
              )
            );
          }
        }, 100);
      };
      ScrollParent.addEventListener("scroll", scrollEvent);
      window.addEventListener("resize", resizeEvent);

      return () => {
        ScrollParent.removeEventListener("scroll", scrollEvent);
        window.removeEventListener("resize", resizeEvent);
      };
    }
  });
  return show ? (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
        transition: ".5s all ease-in",
      }}
    >
      {renderEvents()}
    </div>
  ) : (
    <div
      ref={ref}
      style={{ height: "1405px", backgroundColor: "transparent" }}
    ></div>
  );
}
