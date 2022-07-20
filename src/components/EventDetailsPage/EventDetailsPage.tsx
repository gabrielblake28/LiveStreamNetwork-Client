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

const userApi = new UserAPI();
const eventApi = new EventAPI();

export default function EventDetailsPage() {
  const [userName, setUserName] = useState("");
  const [eventUserInfo, setEventUserInfo] = useState<IEvent>();
  // const [eventUserId, setEventUserId] = useState("");

  const location = useLocation();
  const Event = location.state as IEvent;
  const userInfo = useRecoilValue(CurrentUserData);

  useEffect(() => {
    userApi.GetUser(Event?.user_id as string).then((response) => {
      setUserName(response.display_name);
    });
  }, [Event]);

  useEffect(() => {
    eventApi.GetEvent(Event.event_id as string).then((response) => {
      setEventUserInfo(response);
    });
  }, [Event]);

  return Event ? (
    <div className="event-details-page-container">
      <div className="event-details-page-content">
        <div className="event-details-page-header-wrapper">
          <div className="event-details-page-header">
            <div className="event-details-header-display-column">
              <div className="event-details-page-header-avatar">
                <Link to="/user" state={eventUserInfo?.user_id}>
                  <IconButton style={{ color: "#A970FF" }} size="small">
                    <Avatar
                      src={eventUserInfo?.profile_image_url}
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
                      fontSize: "22px",
                    }}
                  >
                    {Event?.title}
                    {/* This is a test title and if my calculations are correct this text will wrap around to a second line */}
                  </Typography>
                </div>
                <Link
                  to="/user"
                  state={eventUserInfo?.user_id}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                  >
                    {Event.display_name || userName}
                  </Typography>
                </Link>
                <Typography
                  variant="caption"
                  style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
                >
                  {`${new Date(Event?.start_timestamp).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    }
                  )}, ${new Date(Event?.start_timestamp).toLocaleTimeString(
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

            {Event.user_id != userInfo.user_id ? (
              <div className="event-details-page-notification-button">
                <SubscriptionComponent
                  EventId={Event.event_id as string}
                  SubscriptionId={Event.subscription_id}
                />
              </div>
            ) : (
              <div className="event-details-page-edit-event-button">
                <EditDeleteEventComponent Event={Event} />
              </div>
            )}
          </div>
        </div>
        <div className="event-details-page-details">
          <div className="event-details-page-image">
            <img
              style={{ borderRadius: "8px" }}
              src={Event?.image}
              height={275}
              width={500}
            />
          </div>
          <div className="event-details-page-description">
            <Typography
              variant="body2"
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              augue lacus viverra vitae. Eu nisl nunc mi ipsum faucibus vitae
              aliquet nec ullamcorper. Ac placerat vestibulum lectus mauris
              ultrices eros in cursus turpis. Bibendum at varius vel pharetra
              vel turpis nunc eget. Sit amet facilisis magna etiam tempor orci
              eu lobortis. Diam maecenas ultricies mi eget mauris pharetra.
              Turpis in eu mi bibendum neque egestas congue quisque
              {/* {Event?.description} */}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>not loaded</div>
  );
}
