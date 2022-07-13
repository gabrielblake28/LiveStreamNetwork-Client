import { WindowOutlined } from "@mui/icons-material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { receiveMessageOnPort } from "worker_threads";
import { IEvent } from "../../API/Events/IEvent";
import { IEventProvider } from "../../Service/InfiniteScrollService/def/IEventProvider";
import { EventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";
import { InfiniteScrollState } from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";
import { InfiniteScrollPage } from "./InfiniteScrollPage";

type InfiniteScrollContainerProps = {
  ScrollParent?: HTMLDivElement;
  EventProvider: IEventProvider;
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
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Load More
        </div>
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
          Loading...
        </div>
      );
    }

    return <div></div>;
  };

  const AddPage = async () => {
    setContainerState(InfiniteScrollState.Loading);
    const page = await EventProvider.ProvideEvents(pages?.length || 0, 30);
    setPages((prev: IEvent[][]) => {
      prev.push(page);
      return prev;
    });
    setContainerState(InfiniteScrollState.Idle);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "70px",
          overflowY: "scroll",
        }}
        ref={ref}
      >
        {RenderPages()}
      </div>
      <div className="scroll-footer" style={{}}>
        {RenderFooter()}
      </div>
    </React.Fragment>
  );
}
