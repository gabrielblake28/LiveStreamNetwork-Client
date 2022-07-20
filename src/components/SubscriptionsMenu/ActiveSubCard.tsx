import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

type ActiveSubProps = {
  handleClose: Function;
  data: IEvent;
};

const eventAPI = new EventAPI();

export default function ActiveSubCard({ handleClose, data }: ActiveSubProps) {

  return (
    <Link
      to="event"
      onClick={() => {
        handleClose();
      }}
      state={data}
      style={{ textDecoration: "none", color: "#aaaaaa" }}
    >
      <div className="active-sub-card-wrapper">
        <div className="active-sub-card-avatar">
          <img
            style={{
              width: "35px",
              height: "35px",
            }}
            src={data.image}
          />
        </div>
        <div className="active-sub-card-content">
          <div className="active-sub-card-title">
            <Typography
              sx={{
                fontFamily: "Source Sans Pro",
                color: "#aaaaaaa",
                fontSize: "12px",
              }}
            >
              {data.title}
            </Typography>
          </div>
          <div className="active-sub-card-time">
            <Typography
              sx={{
                fontFamily: "Source Sans Pro",
                color: "#aaaaaaa",
                fontSize: "12px",
              }}
            >
              {data.start_timestamp ? (
                `${new Date(data?.start_timestamp).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                })}, ${new Date(data?.start_timestamp).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )}`
              ) : (
                <div>Date Not Specified</div>
              )}
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
