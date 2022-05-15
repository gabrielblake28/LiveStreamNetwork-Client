import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import "./EventCard.css";
import image2 from "../../assets/img2.jpg";
// import mizkif from "../../assets/mizkif.jpg";
import mock1 from "../../assets/mockTN1.jpg";
import mock2 from "../../assets/mockTN2.jpg";
import mock3 from "../../assets/mockTN3.jpg";

// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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
          <CardActionArea>
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
