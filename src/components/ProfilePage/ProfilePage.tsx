import { AppBar, Avatar, Divider, Tab, Tabs, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { FeaturedEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import ProfilePageSettings from "./ProfilePageSettings";
import ProfilePageProfile from "./ProfilePageProfile";

const theme = createTheme({});

const tabsTheme = createTheme({
  palette: {
    primary: {
      main: "#9552fa",
    },
    secondary: {
      main: "#aaaaaa",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#aaaaaa",
        },
      },
    },
  },
});

export default function ProfilePage() {
  const userInfo = useRecoilValue(CurrentUserData);
  const [value, setValue] = useState<string>("profile");
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "C:UsersGabrielWorkspaceMainProjectsTWEFrontendsrcassets\twitch_banner.jpg"
  );
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const featuredEvents = useRecoilValue(FeaturedEvents);

  // useEffect(() => {
  //   const api = new EventAPI();

  //   api.GetFeaturedEvents(24, 1).then((result: IEvent[]) => {
  //     setFeaturedEvents(() => result);
  //   });
  // }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const ActiveComponent = (value) => {
    if (value === "profile") {
      return <ProfilePageProfile />;
    } else if (value === "settings") {
      return <ProfilePageSettings />;
    } else if (value === "events") {
      return <div></div>;
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page-header-container">
        <div className="profile-page-user-data-container">
          <div className="profile-page-username">
            <Avatar
              style={{
                height: "130px",
                width: "130px",
                marginBottom: "10px",
              }}
              src={userInfo.profile_image_url}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#CCCCCC",
                fontFamily: "Source Sans Pro",
              }}
            >
              {userInfo.display_name}
            </Typography>
          </div>
          <div className="profile-page-user-data">
            <ThemeProvider theme={tabsTheme}>
              <Tabs
                style={{
                  color: "#CCCCCC",
                  textTransform: "none",
                }}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                aria-label="action tabs example"
              >
                <Tab
                  disableRipple
                  label={
                    <Typography
                      sx={{
                        color: "#CCCCCC",
                        fontFamily: "Source Sans Pro",
                        fontSize: "15px",
                      }}
                    >
                      Profile
                    </Typography>
                  }
                  value="profile"
                />
                <Tab
                  disableRipple
                  label={
                    <Typography
                      sx={{
                        color: "#CCCCCC",
                        fontFamily: "Source Sans Pro",
                        fontSize: "15px",
                      }}
                    >
                      Settings
                    </Typography>
                  }
                  value="settings"
                />
                <Tab
                  disableRipple
                  label={
                    <Typography
                      sx={{
                        color: "#CCCCCC",
                        fontFamily: "Source Sans Pro",
                        fontSize: "15px",
                      }}
                    >
                      Events
                    </Typography>
                  }
                  value="events"
                />
              </Tabs>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className="profile-page-content-container">
        {ActiveComponent(value)};
      </div>
    </div>
  );
}
