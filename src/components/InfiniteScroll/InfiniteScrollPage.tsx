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
  ScrollParent: HTMLDivElement;
};

let timeout: NodeJS.Timeout;
let scrollEvent: (this: HTMLDivElement, ev: Event) => any;

export function InfiniteScrollPage({
  Events,
  ScrollParent,
}: InfiniteScrollPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const windowWidth = useWindowWidth();
  const [elementsToDisplay, setElementsToDisplay] = useState(
    ScreenSizeConstants.GetNumberOfEventsPerSlide(windowWidth)
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
      console.log(
        PageIsVisible(ref.current?.offsetTop, ref.current?.offsetHeight)
      );
      scrollEvent = () => {
        const scrollY = ScrollParent.scrollTop;
        clearTimeout(timeout);
        new Promise((resolve) => {
          timeout = setTimeout(() => {
            if (scrollY == ScrollParent.scrollTop) {
              if (ref?.current) {
                setShow(
                  PageIsVisible(
                    ref.current?.offsetTop,
                    ref.current?.offsetHeight
                  )
                );
              }
              resolve("");
            }
          }, 5);
        });
      };
      ScrollParent.addEventListener("scroll", scrollEvent);
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
