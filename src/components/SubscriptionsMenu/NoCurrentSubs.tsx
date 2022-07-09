import { Typography } from "@mui/material";
import noSubs from "../../assets/illustrations/no-subs.svg";

export default function NoCurrentSubs() {
  return (
    <div className="no-current-subs-wrapper">
      <div className="no-current-subs-image">
        <img height="250px" width="200px" src={noSubs} />
      </div>
      <div className="no-current-subs-text">
        <div className="no-current-subs-top-text">
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              color: "#e5e5e5",
              fontSize: "13px",
            }}
          >
            Click The Notification Bell To Subscribe To Events
          </Typography>
        </div>
        <div className="no-current-subs-bottom-text">
          <Typography
            sx={{
              fontFamily: "Source Sans Pro",
              color: "#aaaaaa",
              fontSize: "12px",
              marginTop: "5px",
            }}
          >
            You Have No Subscriptions
          </Typography>
        </div>
      </div>
    </div>
  );
}
