import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IEvent } from "../../API/Events/IEvent";
import {
  InfiniteScrollController,
  InfiniteScrollState,
} from "../../Service/InfiniteScrollService/impl/InfiniteScrollController";
import { MockEventProvider } from "../../Service/InfiniteScrollService/impl/MockEventProvider";
import { InfiniteScrollPage } from "./InfiniteScrollPage";

type InfiniteScrollContainerProps = {};
const eventProvider = new MockEventProvider();
const scrollController = new InfiniteScrollController(eventProvider, 20);
export function InfiniteScrollContainer({}: InfiniteScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<IEvent[][]>([]);
  const [elementsCreated, setElementsCreated] = useState<number>(0);
  const [containerState, setContainerState] = useState<InfiniteScrollState>(
    InfiniteScrollState.Idle
  );
  const RenderPages = () => {
    const pagesToRender: JSX.Element[] = [];
    for (let i = 0; i < pages.length; i++) {
      pagesToRender.push(<InfiniteScrollPage Events={pages[i]} key={i} />);
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
    window.addEventListener("scroll", () => {
      if (ref && ref.current) {
        console.log(
          window.pageYOffset + window.innerHeight,
          ref.current.offsetTop + ref.current.offsetHeight
        );
        if (
          window.pageYOffset + window.innerHeight >
          ref.current.offsetTop + ref.current.offsetHeight
        ) {
          if (scrollController.ShouldGetPage(elementsCreated)) {
            AddPage();
          }
        }
      }
    });
  }, [ref]);

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
