import { IconButton, Typography } from "@mui/material";
import "./EventDetailsPage.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useState } from "react";

export default function EventDetailsPage() {
  const [icon, setIcon] = useState(false);
  return (
    <div className="event-details-page-container">
      <div className="event-details-page-content">
        <div className="event-details-page-header">
          <Typography
            variant="h4"
            style={{ fontFamily: "Source Sans Pro", color: "white" }}
          >
            Event Title Here
          </Typography>
          <div className="event-details-page-notification-button">
            <IconButton
              onClick={() => {
                if (icon === true) {
                  // show confirm unsubscribe modal
                } else {
                  //set as subscribed
                  setIcon(!icon);
                }
                setIcon(!icon);
              }}
            >
              {icon === false ? (
                <NotificationsNoneOutlinedIcon
                  sx={{ width: "35px", height: "35px", color: "#aaaaaa" }}
                />
              ) : (
                <NotificationsActiveIcon
                  className="bounce"
                  sx={{ width: "35px", height: "35px", color: "#A970FF" }}
                />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
