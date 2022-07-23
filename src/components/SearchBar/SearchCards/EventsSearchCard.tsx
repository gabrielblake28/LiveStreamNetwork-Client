import { Link } from "react-router-dom";
import "./SearchCards.css";
import { Typography } from "@mui/material";
import { IEvent } from "../../../API/Events/IEvent";
import { useEffect, useState } from "react";
import { UserAPI } from "../../../API/Users/UserAPI";
import { IUser } from "../../../API/Users/IUser";

const userAPI = new UserAPI();

type EventsSearchCardProps = {
  SearchResult: Partial<IEvent>;
  setShowSearchDropDown: Function;
};

export default function EventsSearchCard({
  SearchResult,
  setShowSearchDropDown,
}: EventsSearchCardProps) {
  const [eventData, setEventData] = useState<IEvent | undefined>();
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    userAPI.GetUser(SearchResult.user_id as string).then((response) => {
      setUserData(response);
    });
  });

  return (
    <Link
      to="/event"
      onClick={() => {
        setShowSearchDropDown("none");
        console.log(SearchResult);
      }}
      state={SearchResult}
      style={{
        textDecoration: "none",
        color: "#aaaaaa",
      }}
    >
      <div className="event-search-card-container">
        <div className="event-search-thumbnail">
          <img src={SearchResult.image} height="35px" width="55px" />
        </div>
        <div className="event-search-title">
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              fontSize: "15px",
              color: "#fff",
            }}
          >
            {SearchResult.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              fontSize: "10px",
              margin: "5px 0 5px 10px",
              color: "#aaaaaa",
            }}
          >
            {userData?.display_name}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
