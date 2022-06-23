import {
  Avatar,
  createTheme,
  Divider,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./UserPage.css";
import { useEffect, useState } from "react";
import { FeaturedEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import UserPageProfile from "./UserPageProfile";

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

export default function UserPage() {
  const userPageUserData = useRecoilValue(CurrentUserData);
  const [value, setValue] = useState("profile");
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "C:UsersGabrielWorkspaceMainProjectsTWEFrontendsrcassets\twitch_banner.jpg"
  );
  const UserData = useRecoilValue(CurrentUserData);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const featuredEvents = useRecoilValue(FeaturedEvents);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const api = new EventAPI();

    api.GetFeaturedEvents(24, 1).then((result: IEvent[]) => {
      setFeaturedEvents(() => result);
    });
  }, []);

  const ActiveComponent = (value) => {
    if (value === "profile") {
      return <UserPageProfile />;
    } else if (value === "events") {
      return <div></div>;
    }
  };

  return (
    <div className="user-page-container">
      <div className="user-page-header-container">
        <div className="user-page-user-data-container">
          <div className="user-page-username">
            <Avatar
              style={{
                height: "130px",
                width: "130px",
                marginBottom: "10px",
              }}
              src={UserData.profile_image_url}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#CCCCCC",
                fontFamily: "Source Sans Pro",
              }}
            >
              {UserData.display_name}
            </Typography>
          </div>
          <div className="user-page-user-data">
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
                <Tab disableRipple label="Profile" value="profile" />
                <Tab disableRipple label="Events" value="events" />
              </Tabs>
            </ThemeProvider>
          </div>
        </div>
      </div>

      <div className="user-page-content-container">
        {ActiveComponent(value)}
      </div>
    </div>
  );
}
