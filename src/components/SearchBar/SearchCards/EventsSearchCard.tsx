import { Link } from "react-router-dom";
import "./SearchCards.css";
import { useSetRecoilState } from "recoil";
import { ShowSearchDropDown } from "../../../Recoil/Search/SearchAtoms";
import { Typography } from "@mui/material";
import { SearchResult } from "../../../API/Search/SearchResult";
import { IEvent } from "../../../API/Events/IEvent";

type EventsSearchCardProps = {
  SearchResult: Partial<IEvent>;
};

export default function EventsSearchCard({
  SearchResult,
}: EventsSearchCardProps) {
  const setShowSearchDropDown = useSetRecoilState(ShowSearchDropDown);
  return (
    <Link
      to="/event"
      onClick={() => {
        setShowSearchDropDown("none");
      }}
      style={{
        textDecoration: "none",
        color: "#aaaaaa",
      }}
    >
      <div className="event-search-card-container">
        <div className="event-search-thumbnail">
          <img src={SearchResult.image} height="35px" width="35px" />
        </div>
        <div className="event-search-title"></div>
        <Typography
          sx={{
            fontFamily: "Source Sans Pro",
            color: "#aaaaaaa",
            fontSize: "15px",
          }}
        >
          {SearchResult.title}
        </Typography>
      </div>
    </Link>
  );
}
