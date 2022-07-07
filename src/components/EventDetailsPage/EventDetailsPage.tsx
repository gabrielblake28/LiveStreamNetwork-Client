import { IconButton, Typography } from "@mui/material";
import "./EventDetailsPage.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useState } from "react";
import thumb12 from "../../assets/Thumbnails/thumb12.jpg";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import { useLocation } from "react-router-dom";
import { IUser } from "../../API/Users/IUser";
import { IEvent } from "../../API/Events/IEvent";

export default function EventDetailsPage() {
  const [icon, setIcon] = useState(false);
  const location = useLocation();
  const eventDetails = location.state as IEvent;
  console.log(eventDetails);

  return (
    <div className="event-details-page-container">
      <div className="event-details-page-content">
        <div className="event-details-page-header-wrapper">
          <div className="event-details-page-header">
            <div className="event-details-page-header-text">
              <Typography
                variant="h5"
                style={{ fontFamily: "Source Sans Pro", color: "white" }}
              >
                {eventDetails.title}
                {/* OTK Schooled Season Finale */}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              >
                {eventDetails.name}
                {/* Mizkif | Just Chatting */}
              </Typography>
              <Typography
                variant="caption"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              >
                {`${new Date(eventDetails.start_timestamp).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  }
                )}, ${new Date(eventDetails.start_timestamp).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )}`}
                {/* Start Time: 5:00 pm */}
              </Typography>
              <Typography
                variant="caption"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              ></Typography>
            </div>
            <div className="event-details-page-notification-button">
              <SubscriptionComponent
                EventId={eventDetails.event_id}
                SubscriptionId={eventDetails.subscription_id}
              />
            </div>
          </div>
        </div>
        <div className="event-details-page-details">
          <div className="event-details-page-image">
            <img
              style={{ borderRadius: "8px" }}
              src={thumb12}
              height={275}
              width={500}
            />
            {/* when an event is clicked, use the event id to grab the THUMBNAIL from that
            specific event and display it here */}
          </div>
          <div className="event-details-page-description">
            <Typography
              variant="body2"
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </Typography>
            {/* when an event is clicked, use the event id to grab the DESCRIPTION from that
            specific event and display it here */}
          </div>
        </div>
      </div>
    </div>
  );
}
