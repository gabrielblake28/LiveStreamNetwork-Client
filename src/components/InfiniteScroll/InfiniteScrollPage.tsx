import { current } from "@reduxjs/toolkit";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import EventCard from "../EventCard/EventCard";
import schooled from "../../assets/Thumbnails/schooled.jpg";
import { repeat } from "cypress/types/lodash";
import { TransitionGroup } from "react-transition-group";
import { ScreenSizeConstants } from "../../Service/CarouselService/impl/CarouselController";
import { useWindowWidth } from "../CustomCarousel/CustomCarousel";

type InfiniteScrollPageProps = {
  Events: IEvent[];
};

export function InfiniteScrollPage({ Events }: InfiniteScrollPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const windowWidth = useWindowWidth();
  const [elementsToDisplay, setElementsToDisplay] = useState(
    ScreenSizeConstants.GetNumberOfEventsPerSlide(windowWidth)
  );

  const PageIsVisible = (
    windowScrollY: number,
    windowInnerHeight: number,
    elementOffsetTop: number,
    elementHeight: number
  ): boolean => {
    if (windowScrollY + windowInnerHeight < elementOffsetTop) {
      return false;
    } else if (windowScrollY <= elementOffsetTop + elementHeight) {
      return true;
    }

    return false;
  };

  const renderEvents = () => {
    const eventsToRender: JSX.Element[] = [];

    Events?.forEach((event) => {
      eventsToRender.push(
        <div>
          <EventCard
            EventId={event.event_id!}
            CreatorName={event.name}
            EventTime={event.start_timestamp}
            EventTitle={event.title}
            EventImg={event.image || schooled}
            ProfilePic={event.profile_pic}
            SubscriptionId={event.subscription_id}
            key={event.event_id!}
          />
        </div>
      );
    });

    return eventsToRender;
  };

  useLayoutEffect(() => {
    setElementsToDisplay(
      ScreenSizeConstants.GetNumberOfEventsPerSlide(windowWidth)
    );
  }, [windowWidth]);

  useEffect(() => {
    if (ref?.current) {
      PageIsVisible(
        window.scrollY,
        window.innerHeight,
        ref.current?.offsetTop,
        ref.current?.offsetHeight
      );
      window.addEventListener("scroll", (e) => {
        const scrollY = window.scrollY;

        setTimeout(() => {
          if (scrollY == window.scrollY) {
            if (ref?.current) {
              setShow(
                PageIsVisible(
                  window.scrollY,
                  window.innerHeight,
                  ref.current?.offsetTop,
                  ref.current?.offsetHeight
                )
              );
            }
          }
        }, 5);
      });
    }
  }, [ref]);
  return show ? (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: `repeat(${elementsToDisplay}, 300px)`,
        transition: ".5s all ease-in",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "1em",
        paddingRight: "1em",
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
