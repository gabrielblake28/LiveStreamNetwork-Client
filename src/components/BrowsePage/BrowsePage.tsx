import { Typography } from "@mui/material";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";

import "./BrowsePage.css";

type BrowsePageProps = {
  ParentRef?: HTMLDivElement;
};

export default function BrowsePage({ ParentRef }: BrowsePageProps) {
  return (
    <div className="browse-page-container">
      <div className="browse-page-header">
        <Typography
          sx={{
            color: "#fff",
            fontSize: "30px",
            fontFamily: "Source Sans Pro",
          }}
        >
          Browse Events
        </Typography>
      </div>
      <div className="browse-page-content">
        <InfiniteScrollContainer ScrollParent={ParentRef} />
      </div>
    </div>
  );
}
