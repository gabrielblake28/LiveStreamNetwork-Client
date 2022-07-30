import { CircularProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import { IEventProvider } from "../../Service/InfiniteScrollService/def/IEventProvider";
import {
  InfiniteScrollController,
  InfiniteScrollState,
} from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";
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

let scrollController: InfiniteScrollController;
export function InfiniteScrollContainer({
  ScrollParent,
  EventProvider,
}: InfiniteScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<IEvent[][]>([]);
  const [containerState, setContainerState] = useState<InfiniteScrollState>(
    InfiniteScrollState.Idle
  );

  useEffect(() => {
    const container = GetScrollParent();
    if (EventProvider && container) {
      scrollController = new InfiniteScrollController(
        EventProvider,
        container.clientWidth,
        1000
      );

      AddPage();
    }

    if (EventProvider !== scrollController.EventProvider) {
      scrollController.EventProvider = EventProvider;
    }
  }, [EventProvider, ScrollParent, ref?.current]);

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
            ScrollController={scrollController}
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
    if (scrollController.ShouldGetPage()) {
      setContainerState(InfiniteScrollState.Loading);

      const page = await scrollController.NextPage();

      setPages((prev: IEvent[][]) => {
        prev.push(page);
        return prev;
      });

      setContainerState(InfiniteScrollState.Idle);
    }
  };

  useLayoutEffect(() => {
    let scrollEvent = () => {
      const scrollParent = GetScrollParent();
      if (scrollParent) {
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

    let resizeEvent = () => {
      const container = GetScrollParent();
      if (container) {
        const width = container.clientWidth;
        setTimeout(() => {
          if (width != container.clientWidth) {
            return;
          }

          if (container.clientWidth !== scrollController.ContainerWidth) {
            scrollController
              .CalculatePagesOnScreenResize(container.clientWidth)
              .then((result) => {
                setPages(result);
                container.scrollTo({});
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }, 500);
      }
    };

    GetScrollParent()?.addEventListener("scroll", scrollEvent);
    window?.addEventListener("resize", resizeEvent);

    return () => {
      GetScrollParent()?.removeEventListener("scroll", scrollEvent);
      window?.removeEventListener("resized", resizeEvent);
    };
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
