import { Divider, Menu, Typography } from "@mui/material";
import { useState } from "react";
import EventsSearchCard from "../SearchBar/SearchCards/EventsSearchCard";
import ActiveSubCard from "./ActiveSubCard";
import NoCurrentSubs from "./NoCurrentSubs";
import "./SubscriptionsMenu.css";

type SubscriptionsMenuProps = {
  setSubIconFill: Function;
  subsAnchorEl: null | HTMLElement;
  setSubsAnchorEl: Function;
};

export default function SubscriptionsMenu({
  setSubIconFill,
  subsAnchorEl,
  setSubsAnchorEl,
}: SubscriptionsMenuProps) {
  const [activeSubs, setActiveSubs] = useState<Boolean>(false);
  const handleClose = () => {
    setSubsAnchorEl(null);
    setSubIconFill(false);
  };
  return (
    <Menu
      sx={{
        mt: "36px",
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
            sx={{
                fontFamily: "Source Sans Pro",
                color: "#e5e5e5",
                fontSize: "20px",
              }}
          >
            Subscriptions
          </Typography>
        </div>
        {/* <Divider variant="middle" color="#aaaaaa" /> */}
        <div className="subs-menu-content">
          {/* <NoCurrentSubs /> */}
          {/* <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>  */}
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
          <ActiveSubCard handleClose={handleClose}></ActiveSubCard>
        </div>
      </div>
    </Menu>
  );
}
