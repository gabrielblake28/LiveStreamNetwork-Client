import { Slideshow } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
import schooled from "../../assets/Thumbnails/schooled.jpg";
import { Link } from "react-router-dom";
import { IEvent } from "../../API/Events/IEvent";
import { IUser } from "../../API/Users/IUser";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import "./EventCard.css";

type EventCardProps = {
  Event: IEvent;
};

export default function EventCard({ Event }: EventCardProps) {
  return (
    <div className="card-column-wrapper">
      <div className="card-hover-translate">
        <Card className="event-card">
          <CardActionArea>
            <Link
              to="event"
              state={Event?.event_id}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="185"
                image={Event?.image || schooled}
                onClick={() => {
                  // send data to the event details page
                }}
              />
            </Link>
          </CardActionArea>
        </Card>
      </div>
      <div className="event-footer__panel-container">
        <div className="event-footer__panel-left">
          <div className="event-avatar">
            <Link to="/user" state={Event?.user_id}>
              <IconButton style={{ color: "#A970FF" }}>
                <Avatar
                  src={Event?.profile_pic}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </IconButton>
            </Link>
          </div>
          <div className="title-creator-timestamp">
            <Link
              to="event"
              state={Event as IEvent}
              style={{ textDecoration: "none" }}
            >
              <div className="event-title">{Event?.title}</div>
            </Link>
            <Link
              to="/user"
              state={Event?.user_id}
              style={{ textDecoration: "none" }}
            >
              <div className="event-creator-name">
                {/* {Event.name} */}
                Mizkif
              </div>
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
        <div className="event-footer__panel-right">
          <SubscriptionComponent
            EventId={Event?.event_id!}
            SubscriptionId={Event?.subscription_id}
          />
        </div>
      </div>
    </div>
  );
}
