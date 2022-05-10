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
import { styled } from "@mui/material/styles";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import { useRecoilState } from "recoil";
import { homeIconState } from "../Atoms/Atoms";
import "./TopNav.css";

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
import { useState } from "react";
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
  // open: boolean;
  setOpen: Function;
};

export default function TopNav({ setOpen }: TopNavProps) {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [homeIconFill, setHomeIconFill] = useState<NavButtonStatus>(
    NavButtonStatus.ACTIVE
  );
  const [subIconFill, setSubIconFill] = useState<NavButtonStatus>(
    NavButtonStatus.INACTIVE
  );
  const [createIconFill, setCreateIconFill] = useState<NavButtonStatus>(
    NavButtonStatus.INACTIVE
  );
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#aaaaaa",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "#aaaaaa",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  });

  return (
    <div className="top-nav-container">
      <div className="top-nav-left-layout">
        <div className="top-nav-logo">
          <EventNoteIcon
            sx={{ width: "35px", height: "35px", color: "#A970FF" }}
          />
        </div>
        <Link to="/" style={{ textDecoration: "none", color: "#e5e5e5" }}>
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
            <IconButton
              href="/"
              style={{ color: "#EFEFF1" }}
              aria-label="Create-Event"
              onClick={(e) => {
                setHomeIconFill(NavButtonStatus.ACTIVE);
              }}
            >
              {homeIconFill === NavButtonStatus.ACTIVE ? (
                <CottageIcon sx={{ width: "25px", height: "25px" }} />
              ) : (
                <CottageOutlinedIcon sx={{ width: "25px", height: "25px" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Subscriptions">
            <IconButton
              style={{ color: "#EFEFF1" }}
              aria-label="Create-Event"
              // onClick={}
            >
              {subIconFill === NavButtonStatus.ACTIVE ? (
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
                setCreateIconFill(NavButtonStatus.ACTIVE);
              }}
            >
              {createIconFill === NavButtonStatus.ACTIVE ? (
                <AddBoxIcon sx={{ width: "23px", height: "23px" }} />
              ) : (
                <AddBoxOutlinedIcon sx={{ width: "23px", height: "23px" }} />
              )}
            </IconButton>
          </Tooltip>
        </div>
        <div className="top-nav-user-avatar">
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
          <ThemeProvider theme={theme}>
            <Menu
              sx={{
                mt: "45px",
              }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <MenuItem
                  onClick={() => {
                    setHomeIconFill(NavButtonStatus.INACTIVE);
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <PermIdentityOutlinedIcon
                      sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
                    />
                  </ListItemIcon>
                  <Typography variant="subtitle2" sx={{ color: "#EFEFF1" }}>
                    Profile
                  </Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <StarBorderOutlinedIcon
                    sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
                  />
                </ListItemIcon>
                <Typography variant="subtitle2" sx={{ color: "#EFEFF1" }}>
                  Subscriptions
                </Typography>
              </MenuItem>
              <Divider variant="middle" color="white" />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LogoutOutlinedIcon
                    sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
                  />
                </ListItemIcon>
                <Typography variant="subtitle2" sx={{ color: "#EFEFF1" }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
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
