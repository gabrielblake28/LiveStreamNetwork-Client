import { Upcoming } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import { IEventProvider } from "../../Service/InfiniteScrollService/def/IEventProvider";
import { UpcomingEventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";

import "./BrowsePage.css";

type BrowsePageProps = {
  ParentRef?: HTMLDivElement;
};

export default function BrowsePage({ ParentRef }: BrowsePageProps) {
  let userData = useRecoilValue(CurrentUserData);
  const [eventProvider, setEventProvider] = useState<IEventProvider>(
    new UpcomingEventProvider("0")
  );
  useEffect(() => {
    setEventProvider(new UpcomingEventProvider(userData.user_id));
  }, [userData]);
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
          Event Catalog
        </Typography>
      </div>
      <div className="browse-page-content">
        <InfiniteScrollContainer
          ScrollParent={ParentRef}
          EventProvider={eventProvider}
        />
      </div>
    </div>
  );
}
