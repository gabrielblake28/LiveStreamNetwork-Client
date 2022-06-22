import { Slideshow } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SubscriptionComponent } from "../SubscriptionComponent/SubscriptionComponent";
import "./EventCard.css";

type EventCardProps = {
  EventTitle: string;
  CreatorName: string;
  EventTime: Date;
  EventImg: string;
  ProfilePic: string;
  EventId: string;
  SubscriptionId: string;
};

export default function EventCard({
  EventTitle,
  CreatorName,
  EventTime,
  EventImg,
  ProfilePic,
  EventId,
  SubscriptionId,
}: EventCardProps) {
  return (
    <div className="card-column-wrapper">
      <div className="card-hover-translate">
        <Card className="event-card">
          <CardActionArea onClick={() => {}}>
            <Link to="event" style={{ textDecoration: "none" }}>
              <CardMedia
                component="img"
                height="185"
                image={EventImg}
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
            <Link to="/user">
              <IconButton style={{ color: "#A970FF" }}>
                <Avatar
                  src={ProfilePic}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </IconButton>
            </Link>
          </div>
          <div className="title-creator-timestamp">
            <Link to="event" style={{ textDecoration: "none" }}>
              <div className="event-title">
                {/* {eventTitle} */}
                OTK Schooled Season Finale
              </div>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <div className="event-creator-name">
                {CreatorName}
                Mizkif
              </div>
            </Link>
            <div className="event-timestamp">{`${new Date(
              EventTime
            ).toLocaleDateString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
            })}, ${new Date(EventTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}`}</div>
          </div>
        </div>
        <div className="event-footer__panel-right">
          <SubscriptionComponent
            EventId={EventId}
            SubscriptionId={SubscriptionId}
          />
        </div>
      </div>
    </div>
  );
}
