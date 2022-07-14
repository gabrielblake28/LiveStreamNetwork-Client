import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./ProfilePage.css";
import { useState } from "react";

import ProfilePageSettings from "./ProfilePageSettings";
import ProfilePageProfile from "./ProfilePageProfile";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";
import { EventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const ActiveComponent = (value) => {
    if (value === "settings") {
      return <ProfilePageSettings />;
    } else if (value === "events") {
      return (
        <InfiniteScrollContainer
          EventProvider={new EventProvider(userInfo?.user_id)}
        />
      );
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
                      Events
                    </Typography>
                  }
                  value="events"
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
              </Tabs>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <div className="profile-page-content-container">
        {ActiveComponent(value)}
      </div>
    </div>
  );
}
