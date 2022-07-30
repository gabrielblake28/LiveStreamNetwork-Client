import { Typography } from "@mui/material";


export default function ProfilePageProfile() {
  return (
    <div className="profile-page-profile-container">
      <div className="profile-page-profile-description-container">
        <div className="profile-page-profile-description-header">
          <Typography
            style={{ fontFamily: "Source Sans Pro", color: "#aaaaaa" }}
            variant="h5"
          >
            About Daunttx
          </Typography>
        </div>
        <div className="profile-page-profile-description-body">
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
    </div>
  );
}
