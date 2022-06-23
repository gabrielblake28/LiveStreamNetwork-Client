import { Typography } from "@mui/material";
import noSubs from "../../assets/illustrations/no-subs.png";
import noSubs1 from "../../assets/illustrations/no-subss.svg";

export default function NoCurrentSubs() {
  return (
    <div className="no-current-subs-wrapper">
      <div className="no-current-subs-image">
        <img height="250px" width="200px" src={noSubs1} />
      </div>
      <div className="no-current-subs-text">
        <div className="no-current-subs-top-text">
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "Source Sans Pro", color: "#e5e5e5" }}
          >
            Click The Notification Bell To Subscribe To Events
          </Typography>
        </div>
        <div className="no-current-subs-bottom-text">
          <Typography
            variant="caption"
            sx={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
          >
            You Have No Subscriptions
          </Typography>
        </div>
      </div>
    </div>
  );
}
