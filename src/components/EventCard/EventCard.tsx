import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./EventCard.css";

type EventCardProps = {
  eventTitle: string;
  creatorName: string;
  eventTime: string;
  eventImg: string;
  profilePic: string;
};

export default function EventCard({
  eventTitle,
  creatorName,
  eventTime,
  eventImg,
  profilePic,
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
                image={eventImg}
                onClick={() => {
                  // send data to the event details page
                }}
              />
            </Link>
          </CardActionArea>
        </Card>
      </div>
      <div className="event-card-details">
        <div className="event-avatar">
          <Link to="/user">
            <IconButton style={{ color: "#A970FF" }}>
              <Avatar
                src={profilePic}
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
              {creatorName}
              Mizkif
            </div>
          </Link>
          <div className="event-timestamp">{`${new Date(
            eventTime
          ).toLocaleDateString("en-US", {
            weekday: "short",
            month: "long",
            day: "numeric",
          })}, ${new Date(eventTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}`}</div>
        </div>
      </div>
    </div>
  );
}
