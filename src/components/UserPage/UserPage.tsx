import { Avatar, Divider, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./UserPage.css";
import { useEffect, useState } from "react";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { FeaturedEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

export default function UserPage() {
  const userPageUserData = useRecoilValue(CurrentUserData);
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
      className="user-page-container"
      style={{
        backgroundImage: `url(${UserData.profile_image_url})`,
      }}
    >
      <div className="user-page-header-container">
        <div className="user-page-user-data-container">
          <div className="user-page-username">
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
          <div className="user-page-user-data">
            <div className="user-page-active-events">
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

            <div className="user-page-all-events">
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

      <div className="user-page-content-container">
        <div className="user-page-carousel-section">
          <CustomCarousel
            slideTitle={"Active Subscriptions"}
            slides={featuredEvents}
          />
        </div>
      </div>
    </div>
  );
}
