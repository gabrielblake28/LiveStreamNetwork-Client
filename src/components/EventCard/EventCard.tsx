import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
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
          <CardActionArea onClick={() => {

          }}>
            <CardMedia component="img" height="185" image={eventImg} />
          </CardActionArea>
        </Card>
      </div>
      <div className="event-card-details">
        <div className="event-avatar">
          <IconButton style={{ color: "#A970FF" }}>
            <Avatar
              src={profilePic}
              sx={{
                width: "40px",
                height: "40px",
              }}
            />
          </IconButton>
        </div>
        <div className="title-creator-timestamp">
          <div className="event-title">{eventTitle}</div>
          <div className="event-creator-name">{creatorName}</div>
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
