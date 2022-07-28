import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Link } from "react-router-dom";
import PortraitIcon from "@mui/icons-material/Portrait";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useRecoilState } from "recoil";
import { IconState } from "../../Recoil/Events/EventAtoms";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { useState } from "react";

type LoggedInMenuProps = {
  anchorEl: null | HTMLElement;
  setAnchorEl: Function;
  logout: Function;
};

export default function LoggedInMenu({
  anchorEl,
  setAnchorEl,
  logout,
}: LoggedInMenuProps) {
  const [homeIconFill, setHomeIconFill] = useRecoilState(IconState);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFeedbackModalOpen = () => setFeedbackModalOpen(true);
  const handleFeedbackModalClose = () => setFeedbackModalOpen(false);

  return (
    <Paper sx={{ width: 150 }}>
      <Menu
        sx={{
          mt: "42px",
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
              setHomeIconFill(NavButtonStatus.PROFILE);
              handleClose();
            }}
          >
            <ListItemIcon>
              <PortraitIcon
                sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
              />
            </ListItemIcon>
            <Typography
              variant="subtitle2"
              sx={{ color: "#EFEFF1", fontSize: "12px" }}
            >
              Profile
            </Typography>
          </MenuItem>
        </Link>
        <Divider variant="middle" color="#aaaaaa" />
        <MenuItem
          onClick={() => {
            handleFeedbackModalOpen();
            handleClose();
          }}
        >
          <ListItemIcon>
            <FeedbackOutlinedIcon
              sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
            />
          </ListItemIcon>
          <Typography sx={{ color: "#EFEFF1", fontSize: "12px" }}>
            Feedback
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            window.open(
              "https://www.paypal.com/paypalme/BlakesBusiness",
              "_blank"
            );
          }}
        >
          <ListItemIcon>
            <LocalAtmIcon
              sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
            />
          </ListItemIcon>
          <Typography sx={{ color: "#EFEFF1", fontSize: "12px" }}>
            Support
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(), logout();
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon
              sx={{ width: "20px", height: "20px", color: "#EFEFF1" }}
            />
          </ListItemIcon>
          <Typography
            variant="subtitle2"
            sx={{ color: "#EFEFF1", fontSize: "12px" }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>

      <Modal open={feedbackModalOpen}>
        <FeedbackModal handleFeedbackModalClose={handleFeedbackModalClose} />
      </Modal>
    </Paper>
  );
}
