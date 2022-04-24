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

export default function EventCard() {
  return (
    <div className="card-row-wrapper">
      <div className="card-column-wrapper">
        <div>
          <Card className="event-card">
            <CardActionArea>
              <CardMedia component="img" height="185" image={image2} />
            </CardActionArea>
          </Card>
        </div>
        <div className="event-card-details">
          <div className="event-avatar">
            <IconButton style={{ color: "#00C8AF" }}>
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#00C8AF",
                  color: "black",
                }}
              />
            </IconButton>
          </div>
          <div className="title-creator-timestamp">
            <div className="event-title">OTK Schooled ft. Mizkif</div>
            <div className="event-creator-name">Mizkif</div>
            <div className="event-timestamp">10:00 AM - 1:00 PM PST</div>
          </div>
        </div>
      </div>
      <div>
        <Card className="event-card">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {/* be{bull}nev{bull}o{bull}lent */}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </div>
      <div>
        <Card className="event-card">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {/* be{bull}nev{bull}o{bull}lent */}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </div>
      <div>
        <Card className="event-card">
          <CardActionArea>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                {/* be{bull}nev{bull}o{bull}lent */}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
