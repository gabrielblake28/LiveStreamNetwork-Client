import { WindowOutlined } from "@mui/icons-material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { receiveMessageOnPort } from "worker_threads";
import { IEvent } from "../../API/Events/IEvent";
import {
  InfiniteScrollController,
  InfiniteScrollState,
} from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";
import { MockEventProvider } from "../../Service/InfiniteScrollService/impl/MockEventProvider";
import { InfiniteScrollPage } from "./InfiniteScrollPage";

type InfiniteScrollContainerProps = {
  ScrollParent?: HTMLDivElement;
};
const eventProvider = new MockEventProvider();
const scrollController = new InfiniteScrollController(eventProvider, 20);

export function InfiniteScrollContainer({
  ScrollParent,
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
    const page = await scrollController.GetPage(pages?.length || 0);
    setPages((prev: IEvent[][]) => {
      return ([] as IEvent[][]).concat(prev, [page]);
    });
    setContainerState(InfiniteScrollState.Idle);
  };

  useEffect(() => {
    if (elementsCreated && pages) {
      setElementsCreated(elementsCreated + pages[pages.length - 1].length);
    }
  }, [pages]);
  useLayoutEffect(() => {
    AddPage();
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
          if (scrollController.ShouldGetPage(elementsCreated)) {
            AddPage();
          }
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
