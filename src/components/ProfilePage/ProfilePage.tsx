import { Avatar, Divider, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./ProfilePage.css";
import bi from "../../assets/lud_event.jpg";
import defaultBackground from "../../assets/twitch_banner.jpg";
import { useEffect, useState } from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { FeaturedEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

export default function ProfilePage() {
  const profilePageUserData = useRecoilValue(CurrentUserData);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "C:UsersGabrielWorkspaceMainProjectsTWEFrontendsrcassets\twitch_banner.jpg"
  );
  const UserData = useRecoilValue(CurrentUserData);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const featuredEvents = useRecoilValue(FeaturedEvents);

  useEffect(() => {
    const api = new EventAPI();

    api.GetFeaturedEvents(24, 1).then((result: IEvent[]) => {
      setFeaturedEvents(() => result);
    });
  }, []);

  return (
    <div
      className="profile-page-container"
      style={{
        backgroundImage: `url(${UserData.profile_image_url})`,
      }}
    >
      <div className="profile-page-header-container">
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

      <div className="profile-page-content-container">
        <div className="profile-page-carousel-section">
          <CustomCarousel
            slideTitle={"Active Subscriptions"}
            slides={featuredEvents}
          />
        </div>
      </div>
    </div>
  );
}
