import { CircularProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import { ScreenSizeConstants } from "../../Service/CarouselService/impl/CarouselController";
import { IEventProvider } from "../../Service/InfiniteScrollService/def/IEventProvider";
import { InfiniteScrollState } from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";
import { InfiniteScrollPage } from "./InfiniteScrollPage";

type InfiniteScrollContainerProps = {
  ScrollParent?: HTMLDivElement;
  EventProvider: IEventProvider;
};

const InfiniteScrollStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
};

export function InfiniteScrollContainer({
  ScrollParent,
  EventProvider,
}: InfiniteScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<IEvent[][]>([]);
  const [elementsCreated, setElementsCreated] = useState<number>(0);
  const [containerState, setContainerState] = useState<InfiniteScrollState>(
    InfiniteScrollState.Idle
  );
  const GetScrollParent = () => (ScrollParent ? ScrollParent : ref?.current);
  const RenderPages = () => {
    const pagesToRender: JSX.Element[] = [];
    const scrollParent = GetScrollParent();
    if (scrollParent) {
      for (let i = 0; i < pages.length; i++) {
        pagesToRender.push(
          <InfiniteScrollPage
            Events={pages[i]}
            key={i}
            ScrollParent={scrollParent}
          />
        );
      }
    }

    return pagesToRender;
  };
  const RenderFooter = () => {
    if (containerState == InfiniteScrollState.Idle) {
      return (
        <div
          onClick={() => AddPage()}
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: "25px",
            height: "140px",
            cursor: "pointer",
            color: "#aaaaaa",
          }}
        ></div>
      );
    } else if (containerState == InfiniteScrollState.Loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            fontSize: "25px",
            padding: "10px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <CircularProgress
            disableShrink
            sx={{
              margin: "40px",
              color: "#aaaaaa",
            }}
          />
        </div>
      );
    }

    return <div></div>;
  };

  const AddPage = async () => {
    setContainerState(InfiniteScrollState.Loading);
    const page = await EventProvider.ProvideEvents(
      pages?.length || 0,
      30 +
        (30 %
          ScreenSizeConstants.GetNumberOfEventsPerSlide(
            GetScrollParent()?.clientWidth!
          ))
    );
    setPages((prev: IEvent[][]) => {
      prev.push(page);
      return prev;
    });
  };
  useEffect(() => {
    AddPage();
  }, []);
  useEffect(() => {
    if (elementsCreated && pages) {
      setElementsCreated(elementsCreated + pages[pages.length - 1].length);
    }
  }, [pages]);
  useLayoutEffect(() => {
    let scrollEvent = () => {
      const scrollParent = GetScrollParent();
      if (scrollParent) {
        console.log(
          scrollParent.scrollHeight -
            scrollParent.scrollTop -
            scrollParent.clientHeight <
            1
        );
        if (
          scrollParent.scrollHeight -
            scrollParent.scrollTop -
            scrollParent.clientHeight <
          1
        ) {
          AddPage();
        }
      }
    };

    GetScrollParent()?.addEventListener("scroll", scrollEvent);
    return () => GetScrollParent()?.removeEventListener("scroll", scrollEvent);
  }, [ScrollParent]);

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            width: "320px",
            marginLeft: "119px",
          }}
        ></div>
      </div>
      <div style={InfiniteScrollStyle} ref={ref}>
        {RenderPages()}
      </div>
      <div className="scroll-footer" style={{}}>
        {RenderFooter()}
      </div>
    </React.Fragment>
  );
}
