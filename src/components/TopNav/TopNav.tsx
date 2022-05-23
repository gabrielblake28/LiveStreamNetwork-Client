import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import CottageIcon from "@mui/icons-material/Cottage";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LoggedInMenu from "../LoggedInMenu/LoggedInMenu";
import { Authorized } from "../../Recoil/Auth/AuthAtoms";
import { styled } from "@mui/material/styles";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import { useRecoilState } from "recoil";
import { IconState } from "../../Recoil/Events/EventAtoms";
import "./TopNav.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

import {
  IconButton,
  Avatar,
  Typography,
  InputBase,
  Paper,
  Divider,
  Tooltip,
  MenuItem,
  Menu,
  ListItemIcon,
  createTheme,
  ThemeProvider,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { func } from "prop-types";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Link } from "react-router-dom";

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
  const LocalAccess = localStorage.getItem("evently_access_token");

  if (LocalAccess) {
    return true;
  } else {
    const CookieAccess = cookies.get("evently_access_token");
    if (CookieAccess) {
      return true;
    } else {
      return false;
    }
  }
}

export default function TopNav({ setOpen }: TopNavProps) {
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [homeIconFill, setHomeIconFill] = useRecoilState(IconState);
  const [subIconFill, setSubIconFill] = useRecoilState(IconState);
  const [createIconFill, setCreateIconFill] = useRecoilState(IconState);
  const [isAuth, setIsAuth] = useState<boolean>(useAuth());
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          style={{ textDecoration: "none", color: "#e5e5e5" }}
        >
          <Typography variant="h5" sx={{ fontFamily: "Source Sans Pro" }}>
            WhatsLive
          </Typography>
        </Link>
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
          <Tooltip title="Home">
            <Link to="/" style={{ textDecoration: "none", color: "#e5e5e5" }}>
              <IconButton
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
            </Link>
          </Tooltip>
          <Tooltip title="Subscriptions">
            <IconButton
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
          </Tooltip>
          <Tooltip title="Create Event">
            <IconButton
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
          </Tooltip>
        </div>
        <div className="top-nav-user-avatar">
          {isAuth === false ? (
            <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=cyg0w4xnvmd6qc81l3q6i31zsppy40&redirect_uri=http://localhost:3500/auth/twitch/callback&scope=user:read:email">
              Login with twitch
            </a>
          ) : (
            <IconButton style={{ color: "#00C8AF" }} onClick={handleMenu}>
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#00C8AF",
                  color: "black",
                }}
              />
            </IconButton>
          )}

          <ThemeProvider theme={theme}>
            <LoggedInMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
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
