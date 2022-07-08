import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import hundred from "../../assets/ProfilePictures/maya.jpg";

type ActiveSubProps = {
  handleClose: Function;
};

export default function ActiveSubCard({ handleClose }: ActiveSubProps) {
  return (
    <Link
      to="event"
      onClick={() => {
        handleClose();
      }}
      style={{ textDecoration: "none", color: "#aaaaaa" }}
    >
      <div className="active-sub-card-wrapper">
        <div className="active-sub-card-avatar">
          <Avatar
            sx={{
              width: "35px",
              height: "35px",
            }}
            src={hundred}
          />
        </div>
        <div className="active-sub-card-content">
          <div className="active-sub-card-title">
            <Typography
              sx={{
                fontFamily: "Source Sans Pro",
                color: "#aaaaaaa",
                fontSize: "12px",
              }}
            >
              OTK Schooled Grand Finale
            </Typography>
          </div>
          <div className="active-sub-card-time">
            <Typography
              sx={{
                fontFamily: "Source Sans Pro",
                color: "#aaaaaaa",
                fontSize: "12px",
              }}
            >
              Wed, May 10, 6:00 pm
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
