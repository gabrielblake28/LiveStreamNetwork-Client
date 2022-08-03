import { Avatar, IconButton, Typography } from "@mui/material";
import "./EventDetailsPage.css";
import { useEffect, useState } from "react";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import { Link, useLocation } from "react-router-dom";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import EditDeleteEventComponent from "../EditDeleteEventComponent/EditDeleteEventComponent";
import { UserAPI } from "../../API/Users/UserAPI";
import { IUser } from "../../API/Users/IUser";

const userApi = new UserAPI();
const eventApi = new EventAPI();

export default function EventDetailsPage() {
  const location = useLocation();
  const event = location.state as IEvent;
  const userInfo = useRecoilValue(CurrentUserData);
  const [eventData, setEventData] = useState<IEvent>();

  useEffect(() => {
    if (event.event_id && userInfo.user_id) {
      eventApi.GetEvent(event.event_id, userInfo.user_id).then((response) => {
        setEventData(response);
      });
    }
  }, [event, userInfo]);

  return event ? (
    <div className="event-details-page-container">
      <div className="event-details-page-content">
        <div className="event-details-page-header-wrapper">
          <div className="event-details-page-header">
            <div className="event-details-header-display-column">
              <div className="event-details-page-header-avatar">
                <Link to="/user" state={eventData?.user_id}>
                  <IconButton style={{ color: "#A970FF" }} size="small">
                    <Avatar
                      src={eventData?.profile_image_url}
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </IconButton>
                </Link>
              </div>
              <div className="event-details-page-header-text">
                <div className="event-details-page-title-wrapper">
                  <Typography
                    style={{
                      fontFamily: "Source Sans Pro",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    {event?.title}
                  </Typography>
                </div>
                <Link
                  to="/user"
                  state={eventData?.user_id}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                  >
                    {event.display_name}
                  </Typography>
                </Link>
                <Typography
                  variant="caption"
                  style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                >
                  {`${new Date(event?.start_timestamp).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    }
                  )}, ${new Date(event?.start_timestamp).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}`}
                </Typography>
                <Typography
                  variant="caption"
                  style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                ></Typography>
              </div>
            </div>

            {event.user_id != userInfo.user_id ? (
              <div className="event-details-page-notification-button">
                <SubscriptionComponent
                  EventId={event.event_id as string}
                  SubscriptionId={event.subscription_id}
                />
              </div>
            ) : (
              <div className="event-details-page-edit-event-button">
                <EditDeleteEventComponent Event={event} />
              </div>
            )}
          </div>
        </div>
        <div className="event-details-page-details">
          <div className="event-details-page-image">
            <img
              style={{ borderRadius: "8px" }}
              src={event?.image}
              height={275}
              width={500}
            />
          </div>
          <div className="event-details-page-description">
            <Typography
              style={{
                fontFamily: "Source Sans Pro",
                color: "#fff",
                fontSize: "17px",
              }}
            >
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              augue lacus viverra vitae. Eu nisl nunc mi ipsum faucibus vitae
              aliquet nec ullamcorper. Ac placerat vestibulum lectus mauris
              ultrices eros in cursus turpis. Bibendum at varius vel pharetra
              vel turpis nunc eget. Sit amet facilisis magna etiam tempor orci
              eu lobortis. Diam maecenas ultricies mi eget mauris pharetra.
              Turpis in eu mi bibendum neque egestas congue quisque */}
              {event?.description}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>not loaded</div>
  );
}
