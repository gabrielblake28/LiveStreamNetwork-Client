import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { NavButtonStatus } from "../NavButtonStatus/NavButtonStatus";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { IconState } from "../../Recoil/Events/EventAtoms";

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
            setHomeIconFill(NavButtonStatus.PROFILE);
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
      <Divider variant="middle" color="white" />
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
        <Typography variant="subtitle2" sx={{ color: "#EFEFF1" }}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
}
