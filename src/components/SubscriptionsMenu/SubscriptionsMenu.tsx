import { Divider, Menu, Typography } from "@mui/material";
import { useState } from "react";
import ActiveSubCard from "./ActiveSubCard";
import NoCurrentSubs from "./NoCurrentSubs";
import "./SubscriptionsMenu.css";

type SubscriptionsMenuProps = {
  subsAnchorEl: null | HTMLElement;
  setSubsAnchorEl: Function;
};

export default function SubscriptionsMenu({
  subsAnchorEl,
  setSubsAnchorEl,
}: SubscriptionsMenuProps) {
  const [activeSubs, setActiveSubs] = useState<Boolean>(false);
  const handleClose = () => {
    setSubsAnchorEl(null);
  };
  return (
    <Menu
      sx={{
        mt: "45px",
      }}
      anchorEl={subsAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(subsAnchorEl)}
      onClose={handleClose}
    >
      <div className="subs-menu-wrapper">
        <div className="subs-menu-header">
          <Typography
            variant="h5"
            sx={{ fontFamily: "Source Sans Pro", color: "#e5e5e5" }}
          >
            Subscriptions
          </Typography>
        </div>
        {/* <Divider variant="middle" color="#aaaaaa" /> */}
        <div className="subs-menu-content">
          {/* <NoCurrentSubs></NoCurrentSubs> */}
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
        </div>
      </div>
    </Menu>
  );
}
