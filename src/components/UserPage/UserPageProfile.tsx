import { Typography } from "@mui/material";
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
                color: "#fff",
                fontSize: "20px",
                fontFamily: "Source Sans Pro",
              }}
            >
              About {descriptionHeader}
            </Typography>
          </div>
          <div className="user-page-profile-description-body">
            <Typography
              style={{ fontFamily: "Source Sans Pro",  color: "#fff", fontSize: "14px" }}
              variant="subtitle2"
              
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
              augue lacus viverra vitae. Eu nisl nunc mi ipsum faucibus vitae
              aliquet nec ullamcorper. Ac placerat vestibulum lectus mauris
              ultrices eros in cursus turpis. Bibendum at varius vel pharetra
              vel turpis nunc eget. Sit amet facilisis magna etiam tempor orci
              eu lobortis. Diam maecenas ultricies mi eget mauris pharetra.
              Turpis in eu mi bibendum neque egestas congue quisque
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
