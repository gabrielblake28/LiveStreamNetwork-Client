import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import CottageIcon from "@mui/icons-material/Cottage";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LoggedInMenu from "../LoggedInMenu/LoggedInMenu";
import CreateEventWorkflow from "../CreateEventWorkflow/CreateEventWorkflow";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData, Authorized } from "../../Recoil/Users/UserAtoms";
import "./TopNav.css";
import Cookies from "universal-cookie";
import { UserAPI } from "../../API/Users/UserAPI";

import {
  IconButton,
  Avatar,
  Typography,
  Divider,
  Tooltip,
  createTheme,
  ThemeProvider,
  Modal,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Link } from "react-router-dom";
import { IUser } from "../../API/Users/IUser";
import SubscriptionsMenu from "../SubscriptionsMenu/SubscriptionsMenu";
import SearchBar from "../SearchBar/SearchBar";
import { IconState } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

const eventAPI = new EventAPI();
const userAPI = new UserAPI();
const cookies = new Cookies();

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#3a3d45",
        },
      },
    },
  },
});

type TopNavProps = {
  setOpen: Function;
};

function useAuth(): boolean {
  const isLoggedIn = useRecoilValue(Authorized);
  const setIsLoggedIn = useSetRecoilState(Authorized);
  const setUserData = useSetRecoilState(CurrentUserData);
  let accessKey = "";

  useEffect(() => {
    if (localStorage.getItem("evently_access_token")) {
      accessKey = localStorage.getItem("evently_access_token") || "";
      setIsLoggedIn(true);
    } else if (cookies.get("evently_access_token")) {
      accessKey = cookies.get("evently_access_token");
      localStorage.setItem("evently_access_token", accessKey);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (isLoggedIn) {
      const userData = userAPI.GetOrCreateUser(accessKey).then((response) => {
        setUserData(response as IUser);
      });
    }
  }, [isLoggedIn]);

  return isLoggedIn;
}

function ClearDataOnLogout() {
  cookies.remove("evently_access_token");
  cookies.remove("evently_refresh_token");
  localStorage.removeItem("evently_access_token");
  localStorage.removeItem("evently_refresh_token");
  window.location.replace("http://localhost:3000");
}

export default function TopNav({ setOpen }: TopNavProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subsAnchorEl, setSubsAnchorEl] = useState<null | HTMLElement>(null);
  const [creatEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [homeIconFill, setHomeIconFill] = useRecoilState(IconState);
  const [subIconFill, setSubIconFill] = useState(false);
  const [createIconFill, setCreateIconFill] = useState(false);
  const [subscribedToEvents, setSubscribedToEvents] = useState<IEvent[]>([]);
  const isLoggedIn = useAuth();
  const userInfo = useRecoilValue(CurrentUserData);
  const handleCreateEventModalOpen = () => setCreateEventModalOpen(true);
  const handleCreateEventModalClose = () => setCreateEventModalOpen(false);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleSubsMenu(event: React.MouseEvent<HTMLElement>) {
    setSubsAnchorEl(event.currentTarget);
    setSubIconFill(true);
  }

  return (
    <div className="top-nav-container">
      <div className="top-nav-left-layout">
        <div className="top-nav-logo">
          <EventNoteIcon
            sx={{ width: "35px", height: "35px", color: "#CF5579" }}
          />
        </div>
        <Link
          onClick={() => {
            setHomeIconFill(NavButtonStatus.HOME);
          }}
          to="/"
          style={{
            textDecoration: "none",
            color: "#e5e5e5",
            marginRight: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#e5e5e5",
              fontSize: "20px",
            }}
          >
            LiveStreamNetwork
          </Typography>
        </Link>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{ backgroundColor: "#545454" }}
        />
        <div className="top-nav-browse">
          <Link
            to={"/browse"}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                color: "#e5e5e5",
                fontSize: "20px",
              }}
            >
              Explore
            </Typography>
          </Link>
        </div>
      </div>
      <div className="top-nav-center-layout">
        <div className="top-nav-search-bar">
          <SearchBar />
        </div>
      </div>
      <div className="top-nav-right-layout">
        <div className="top-nav-notifications">
          <Link to="/" style={{ textDecoration: "none", color: "#e5e5e5" }}>
            <Tooltip
              arrow
              title={
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "Source Sans Pro",
                    fontSize: "12px",
                  }}
                >
                  Home
                </Typography>
              }
            >
              <IconButton
                disableRipple
                style={{ color: "#e5e5e5" }}
                aria-label="Home"
                onClick={(e) => {
                  setHomeIconFill(NavButtonStatus.HOME);
                }}
              >
                {homeIconFill === NavButtonStatus.HOME ? (
                  <CottageIcon
                    sx={{ width: "25px", height: "25px", color: "#CF5579" }}
                  />
                ) : (
                  <CottageOutlinedIcon sx={{ width: "25px", height: "25px" }} />
                )}
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip
            arrow
            title={
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                }}
              >
                Subscriptions
              </Typography>
            }
          >
            {isLoggedIn === true ? (
              <IconButton
                disableRipple
                style={{ color: "#e5e5e5" }}
                aria-label="Subs"
                onClick={(e) => {
                  handleSubsMenu(e);
                  eventAPI
                    .GetSubscribedEvents(userInfo.user_id as string)
                    .then((response) => {
                      console.log(response);
                      setSubscribedToEvents(response);
                    });
                }}
              >
                {subIconFill === true ? (
                  <SubscriptionsIcon
                    sx={{ width: "23px", height: "23px", color: "#CF5579" }}
                  />
                ) : (
                  <SubscriptionsOutlinedIcon
                    sx={{ width: "23px", height: "23px" }}
                  />
                )}
              </IconButton>
            ) : (
              <IconButton
                disabled
                disableRipple
                style={{ color: "#4a4a4a" }}
                aria-label="Subs"
              >
                {subIconFill === true ? (
                  <SubscriptionsIcon
                    sx={{ width: "23px", height: "23px", color: "#9552fa" }}
                  />
                ) : (
                  <SubscriptionsOutlinedIcon
                    sx={{ width: "23px", height: "23px" }}
                  />
                )}
              </IconButton>
            )}
          </Tooltip>
          <Tooltip
            arrow
            title={
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Source Sans Pro",
                  fontSize: "12px",
                }}
              >
                Create Event
              </Typography>
            }
          >
            {isLoggedIn === true ? (
              <IconButton
                disableRipple
                style={{ color: "#e5e5e5" }}
                aria-label="Create-Event"
                onClick={() => {
                  handleCreateEventModalOpen();
                  setCreateIconFill(true);
                }}
              >
                {createIconFill === true ? (
                  <AddBoxIcon
                    sx={{ width: "23px", height: "23px", color: "#CF5579" }}
                  />
                ) : (
                  <AddBoxOutlinedIcon sx={{ width: "23px", height: "23px" }} />
                )}
              </IconButton>
            ) : (
              <IconButton
                disabled
                disableRipple
                style={{ color: "#4a4a4a" }}
                aria-label="Create-Event"
                onClick={() => {
                  handleCreateEventModalOpen();
                }}
              >
                {createIconFill === true ? (
                  <AddBoxIcon sx={{ width: "23px", height: "23px" }} />
                ) : (
                  <AddBoxOutlinedIcon sx={{ width: "23px", height: "23px" }} />
                )}
              </IconButton>
            )}
          </Tooltip>
          <Modal open={creatEventModalOpen}>
            <CreateEventWorkflow
              Event={null}
              setCreateIconFill={setCreateIconFill}
              handleCreateEventModalClose={handleCreateEventModalClose}
            />
          </Modal>
        </div>
        <div className="top-nav-user-avatar">
          {isLoggedIn === false ? (
            <a
              style={{
                textDecoration: "none",
              }}
              href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=cyg0w4xnvmd6qc81l3q6i31zsppy40&redirect_uri=http://localhost:3500/auth/twitch/callback&scope=user:read:email"
            >
              <Button
                sx={{
                  backgroundColor: "#CF5579",
                  ml: 1,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#CF5579",
                  },
                }}
                variant="contained"
                size="small"
                onClick={() => {}}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "Source Sans Pro",
                    fontSize: "15px",
                  }}
                >
                  Login With Twitch
                </Typography>
              </Button>
            </a>
          ) : (
            <IconButton onClick={handleProfileMenu}>
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#transparent",
                  color: "black",
                }}
                src={userInfo.profile_image_url}
              />
            </IconButton>
          )}

          <ThemeProvider theme={theme}>
            <LoggedInMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              logout={ClearDataOnLogout}
            />
            <div></div>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <SubscriptionsMenu
              subscribedToEvents={subscribedToEvents}
              setSubIconFill={setSubIconFill}
              subsAnchorEl={subsAnchorEl}
              setSubsAnchorEl={setSubsAnchorEl}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
