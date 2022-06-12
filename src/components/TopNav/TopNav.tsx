import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import CottageIcon from "@mui/icons-material/Cottage";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SearchIcon from "@mui/icons-material/Search";
import LoggedInMenu from "../LoggedInMenu/LoggedInMenu";
import CreateEventModal from "../CreateEventWorkflow/CreateEventWorkflow";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentUserData, Authorized } from "../../Recoil/Users/UserAtoms";
import cors from "cors";
import { IconState } from "../../Recoil/Events/EventAtoms";
import "./TopNav.css";
import Cookies from "universal-cookie";
import { UserAPI } from "../../API/Users/UserAPI";

import {
  IconButton,
  Avatar,
  Typography,
  InputBase,
  Paper,
  Divider,
  Tooltip,
  createTheme,
  ThemeProvider,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Link } from "react-router-dom";
import { IUser } from "../../API/Users/IUser";
import { access } from "fs";

const userAPI = new UserAPI();
const cookies = new Cookies();

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#18181b",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [homeIconFill, setHomeIconFill] = useRecoilState(IconState);
  const [subIconFill, setSubIconFill] = useRecoilState(IconState);
  const [createIconFill, setCreateIconFill] = useRecoilState(IconState);
  const isLoggedIn = useAuth();
  const userInfo = useRecoilValue(CurrentUserData);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="top-nav-container">
      <div className="top-nav-left-layout">
        <div className="top-nav-logo">
          <EventNoteIcon
            sx={{ width: "35px", height: "35px", color: "#A970FF" }}
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
          <Typography variant="h5" sx={{ fontFamily: "Source Sans Pro" }}>
            Evently
          </Typography>
        </Link>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{ backgroundColor: "#545454" }}
        />
        <div className="top-nav-browse">
          {/* <Link
            onClick={() => {
              setHomeIconFill(NavButtonStatus.HOME);
            }}
            to="/browse"
            style={{ textDecoration: "none", color: "#e5e5e5" }}
          > */}
          <Typography variant="h5" sx={{ fontFamily: "Source Sans Pro" }}>
            Browse
          </Typography>
          {/* </Link> */}
        </div>
      </div>
      <div className="top-nav-center-layout">
        <div className="top-nav-search-bar">
          <Paper
            component="form"
            sx={{
              p: "px 02px",
              display: "flex",
              alignItems: "center",
              height: 36,
              width: 380,
              backgroundColor: "#464648",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#EFEFF1" }}
              placeholder="Search"
            />
            <Divider sx={{ height: "36" }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px", color: "#EFEFF1" }}
              aria-label="directions"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div className="top-nav-right-layout">
        <div className="top-nav-notifications">
          <Link to="/" style={{ textDecoration: "none", color: "#e5e5e5" }}>
            <Tooltip title="Home">
              <IconButton
                disableRipple
                style={{ color: "#EFEFF1" }}
                aria-label="Home"
                onClick={(e) => {
                  setHomeIconFill(NavButtonStatus.HOME);
                }}
              >
                {homeIconFill === NavButtonStatus.HOME ? (
                  <CottageIcon sx={{ width: "25px", height: "25px" }} />
                ) : (
                  <CottageOutlinedIcon sx={{ width: "25px", height: "25px" }} />
                )}
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Subscriptions">
            {isLoggedIn === true ? (
              <IconButton
                disableRipple
                style={{ color: "#EFEFF1" }}
                aria-label="Subs"
                // onClick={}
              >
                {subIconFill === NavButtonStatus.SUBS ? (
                  <SubscriptionsIcon sx={{ width: "23px", height: "23px" }} />
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
                // onClick={}
              >
                {subIconFill === NavButtonStatus.SUBS ? (
                  <SubscriptionsIcon sx={{ width: "23px", height: "23px" }} />
                ) : (
                  <SubscriptionsOutlinedIcon
                    sx={{ width: "23px", height: "23px" }}
                  />
                )}
              </IconButton>
            )}
          </Tooltip>
          <Tooltip title="Create Event">
            {isLoggedIn === true ? (
              <IconButton
                disableRipple
                style={{ color: "#EFEFF1" }}
                aria-label="Create-Event"
                onClick={() => {
                  handleModalOpen();
                  setCreateIconFill(NavButtonStatus.CREATE);
                }}
              >
                {createIconFill === NavButtonStatus.CREATE ? (
                  <AddBoxIcon sx={{ width: "23px", height: "23px" }} />
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
                  handleModalOpen();
                  setCreateIconFill(NavButtonStatus.CREATE);
                }}
              >
                {createIconFill === NavButtonStatus.CREATE ? (
                  <AddBoxIcon sx={{ width: "23px", height: "23px" }} />
                ) : (
                  <AddBoxOutlinedIcon sx={{ width: "23px", height: "23px" }} />
                )}
              </IconButton>
            )}
          </Tooltip>
        </div>
        <div className="top-nav-user-avatar">
          {isLoggedIn === false ? (
            <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=cyg0w4xnvmd6qc81l3q6i31zsppy40&redirect_uri=http://localhost:3500/auth/twitch/callback&scope=user:read:email">
              Login with twitch
            </a>
          ) : (
            <IconButton
              // style={{ backgroundColor: "transparent" }}
              onClick={handleMenu}
            >
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
            <div>
              <Modal open={modalOpen}>
                <div className="create-event-modal-wrapper">
                  <CreateEventModal
                    setHomeIconFill={setHomeIconFill}
                    setCreateIconFill={setCreateIconFill}
                    handleModalClose={handleModalClose}
                  />
                </div>
              </Modal>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
