import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      style={{ textDecoration: "none" }}
    >
      <div className="active-sub-card-wrapper" onClick={() => {}}>
        <div className="active-sub-card-avatar">
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
            }}
            // src={userInfo.profile_image_url}
          />
        </div>
        <div className="active-sub-card-content">
          <div className="active-sub-card-title">
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Source Sans Pro", color: "#e5e5e5" }}
            >
              OTK Schooled Grand Finale
            </Typography>
          </div>
          <div className="active-sub-card-time">
            <Typography
              variant="caption"
              sx={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
            >
              Wed, May 10, 6:00 pm
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
