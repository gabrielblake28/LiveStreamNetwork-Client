import { Typography } from "@mui/material";
import { useEffect } from "react";
import UserStreamEmbed from "./UserStreamEmbed";

type userPageProfileProps = {
  descriptionHeader: string;
  description: string;
};

export default function UserPageProfile({
  descriptionHeader,
  description,
}: userPageProfileProps) {
  return (
    <div className="user-page-profile-container">
      <div className="user-page-profile-description-container">
        <div>
          <div className="user-page-profile-description-header">
            <Typography
              style={{
                fontFamily: "Source Sans Pro",
                color: "#aaaaaa",
                fontSize: "21px",
              }}
            >
              About {descriptionHeader}
            </Typography>
          </div>
          <div className="user-page-profile-description-body">
            <Typography
              style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
              variant="subtitle2"
            >
              {description}
            </Typography>
          </div>
        </div>
        <div className="user-page-stream-embed">
          <UserStreamEmbed stream_embed_name={descriptionHeader} />
        </div>
      </div>
    </div>
  );
}
