import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IEvent } from "../../API/Events/IEvent";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import "./EventCard.css";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";

type EventCardProps = {
  Event: IEvent;
};

export default function EventCard({ Event }: EventCardProps) {
  const [isUsersEvent, setIsUsersEvent] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleEditMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const userInfo = useRecoilValue(CurrentUserData);

  return (
    <div className="card-column-wrapper">
      <div className="card-hover-translate">
        <Card className="event-card">
          <CardActionArea>
            <Link
              to="/event"
              state={Event as IEvent}
              style={{ textDecoration: "none" }}
            >
              <CardMedia component="img" height="185" image={Event?.image} />
            </Link>
          </CardActionArea>
        </Card>
      </div>
      <div className="event-footer__panel-container">
        <div className="event_footer__panel event-footer__panel-left">
          <div className="event-avatar">
            <Link to="/user" state={Event?.user_id}>
              <IconButton style={{ color: "#A970FF" }} size="small">
                <Avatar
                  src={Event?.profile_image_url}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </IconButton>
            </Link>
          </div>
        </div>
        <div className="event_footer__panel event-footer__panel-center">
          <div className="title-creator-timestamp">
            <Link
              to="event"
              state={Event as IEvent}
              style={{ textDecoration: "none" }}
            >
              <div className="event-title">
                {/* asdfasdfasdfasdfasdfasdfasdfadfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf */}
                {Event?.title}
              </div>
            </Link>
            <Link
              to="/user"
              state={Event?.user_id}
              style={{ textDecoration: "none" }}
            >
              <div className="event-creator-name">{Event?.display_name}</div>
            </Link>
            <div className="event-timestamp">{`${new Date(
              Event?.start_timestamp
            ).toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
            })}, ${new Date(Event?.start_timestamp).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            )}`}</div>
          </div>
        </div>
        <div className="event_footer__panel  event-footer__panel-right">
          {Event.user_id == userInfo.user_id ? (
            <></>
          ) : (
            <SubscriptionComponent
              EventId={Event?.event_id!}
              SubscriptionId={Event?.subscription_id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
