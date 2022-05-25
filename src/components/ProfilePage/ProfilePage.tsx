import { Avatar, Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./ProfilePage.css";
import bi from "../../assets/lud_event.jpg";
import defaultBackground from "../../assets/twitch_banner.jpg";
import { useState } from "react";

export default function ProfilePage() {
  const profilePageUserData = useRecoilValue(CurrentUserData);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "C:UsersGabrielWorkspaceMainProjectsTWEFrontendsrcassets\twitch_banner.jpg"
  );
  const UserData = useRecoilValue(CurrentUserData);

  return (
    <div
      className="profile-page-container"
      style={{
        backgroundImage: `url(${UserData.profile_image_url})`,
      }}
    >
      <div className="profile-page-header-container">
        <div className="profile-page-profile-pic">
          {/* <Avatar
            sx={{
              height: "150px",
              width: "150px",
              backgroundColor: "#00C8AF",
              color: "black",
            }}
            src={UserData.profile_image_url}
          ></Avatar> */}
        </div>
        <div className="profile-page-user-data-container">
          <div className="profile-page-username">
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontFamily: "Source Sans Pro",
              }}
            >
              {UserData.display_name}
            </Typography>
          </div>
          <div className="profile-page-user-data">
            <div className="profile-page-active-events">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Upcoming Events
              </Typography>
              <div className="active-events-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  2
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="profile-page-active-subscriptions">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Active Subscriptions
              </Typography>
              <div className="active-subs-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  14
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
            <div className="profile-page-all-events">
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontFamily: "Source Sans Pro",
                }}
              >
                Archived Events
              </Typography>
              <div className="total-events-num">
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  173
                </Typography>
                <div className="underline-on-hover">
                  <Divider
                    variant="fullWidth"
                    sx={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-page-content-container"></div>
    </div>
  );
}
