import { Typography } from "@mui/material";
import { useEffect } from "react";
import UserStreamEmbed from "./UserStreamEmbed";

export default function UserPageProfile() {
  return (
    <div className="user-page-profile-container">
      <div className="user-page-profile-description-container">
        <div>
          <div className="user-page-profile-description-header">
            <Typography
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              variant="h5"
            >
              About Daunttx
            </Typography>
          </div>
          <div className="user-page-profile-description-body">
            <Typography
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              variant="subtitle2"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              venenatis, eros eu posuere dignissim, lorem nibh sodales ipsum,
              cursus venenatis neque ipsum a augue.
            </Typography>
          </div>
        </div>
        <div className="user-page-stream-embed">
          <UserStreamEmbed />
        </div>
      </div>
    </div>
  );
}
