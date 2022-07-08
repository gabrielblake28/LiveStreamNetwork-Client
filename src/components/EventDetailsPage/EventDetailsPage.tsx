import { Typography } from "@mui/material";
import "./EventDetailsPage.css";
import { useEffect, useState } from "react";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import { useLocation } from "react-router-dom";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

const eventApi = new EventAPI();

export default function EventDetailsPage() {
  const [eventDetails, setEventDetails] = useState<IEvent>();
  const location = useLocation();
  const eventId = location.state as string;

  useEffect(() => {
    eventApi.GetEvent(eventId).then((response) => {
      setEventDetails(response);
    });
  }, [eventId]);

  return eventDetails ? (
    <div className="event-details-page-container">
      <div className="event-details-page-content">
        <div className="event-details-page-header-wrapper">
          <div className="event-details-page-header">
            <div className="event-details-page-header-text">
              <Typography
                variant="h5"
                style={{ fontFamily: "Source Sans Pro", color: "white" }}
              >
                {eventDetails?.title}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              >
                {/* {eventDetails.name} */}
              </Typography>
              <Typography
                variant="caption"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              >
                {`${new Date(eventDetails?.start_timestamp).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  }
                )}, ${new Date(
                  eventDetails?.start_timestamp
                ).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}`}
              </Typography>
              <Typography
                variant="caption"
                style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              ></Typography>
            </div>
            <div className="event-details-page-notification-button">
              <SubscriptionComponent
                EventId={eventId}
                SubscriptionId={eventDetails.subscription_id}
              />
            </div>
          </div>
        </div>
        <div className="event-details-page-details">
          <div className="event-details-page-image">
            <img
              style={{ borderRadius: "8px" }}
              src={eventDetails?.image}
              height={275}
              width={500}
            />
          </div>
          <div className="event-details-page-description">
            <Typography
              variant="body2"
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
            >
              {eventDetails?.description}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>not loaded</div>
  );
}
