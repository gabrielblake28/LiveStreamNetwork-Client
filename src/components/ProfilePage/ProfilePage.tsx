import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./ProfilePage.css";
import { useEffect, useRef, useState } from "react";
import ProfilePageSettings from "./ProfilePageSettings";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";
import { UpcomingEventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";

const tabsTheme = createTheme({
  palette: {
    primary: {
      main: "#EB4034",
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
  const [value, setValue] = useState<string>("events");
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const ActiveComponent = (value) => {
    if (value === "settings") {
      return <ProfilePageSettings />;
    } else if (value === "events") {
      return (
        <>
          {show && (
            <InfiniteScrollContainer
              EventProvider={new UpcomingEventProvider(userInfo.user_id || "0")}
              ScrollParent={ref?.current!}
            />
          )}
        </>
      );
    }
  };

  useEffect(() => {
    if (ref?.current) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [ref]);
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
              sx={{
                fontSize: "25px",
                color: "#fff",
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
                  color: "#fff",
                  textTransform: "none",
                }}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
              >
                <Tab
                  disableRipple
                  label={
                    <Typography
                      sx={{
                        color: "#fff",
                        fontFamily: "Source Sans Pro",
                        fontSize: "12px",
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
                        color: "#fff",
                        fontFamily: "Source Sans Pro",
                        fontSize: "12px",
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
      <div className="profile-page-content-container" ref={ref}>
        {ActiveComponent(value)}
      </div>
    </div>
  );
}
