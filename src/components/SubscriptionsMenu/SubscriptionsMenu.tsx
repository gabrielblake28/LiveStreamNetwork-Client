import { Menu, Typography } from "@mui/material";

import { useRecoilValue } from "recoil";
import { IEvent } from "../../API/Events/IEvent";
import { SubscribedToEvents } from "../../Recoil/Events/EventAtoms";
import ActiveSubCard from "./ActiveSubCard";
import NoCurrentSubs from "./NoCurrentSubs";
import { UserAPI } from "../../API/Users/UserAPI";
import "./SubscriptionsMenu.css";
import { useState } from "react";

const userAPI = new UserAPI();

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
  const subcribedEventsData = useRecoilValue(SubscribedToEvents);
  const handleClose = () => {
    setSubsAnchorEl(null);
    setSubIconFill(false);
  };

  function Results(result: Partial<IEvent>[]): JSX.Element[] {
    const elementsToRender: JSX.Element[] = [];

    if (result.length < 1) {
      elementsToRender.push(<NoCurrentSubs />);
    } else {
      result.forEach((data) => {
        elementsToRender.push(
          <ActiveSubCard handleClose={handleClose} data={data} />
        );
      });
    }

    return elementsToRender;
  }

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
        <div className="subs-menu-content">
          <div>{Results(subcribedEventsData)}</div>
        </div>
      </div>
    </Menu>
  );
}
