import { DataArray } from "@mui/icons-material";
import { Menu, Typography } from "@mui/material";
import { IEvent } from "../../API/Events/IEvent";
import ActiveSubCard from "./ActiveSubCard";
import NoCurrentSubs from "./NoCurrentSubs";
import "./SubscriptionsMenu.css";

type SubscriptionsMenuProps = {
  setSubIconFill: Function;
  subsAnchorEl: null | HTMLElement;
  setSubsAnchorEl: Function;
  subscribedToEvents: IEvent[];
};

export default function SubscriptionsMenu({
  setSubIconFill,
  subsAnchorEl,
  setSubsAnchorEl,
  subscribedToEvents,
}: SubscriptionsMenuProps) {
  const handleClose = () => {
    setSubsAnchorEl(null);
    setSubIconFill(false);
  };

  function Results(result: IEvent[]): JSX.Element[] {
    const elementsToRender: JSX.Element[] = [];

    if (result.length < 1) {
      elementsToRender.push(<NoCurrentSubs />);
    } else {
      result.forEach((data) => {
        elementsToRender.push(
          <ActiveSubCard key={data.user_id} handleClose={handleClose} data={data} />
        );
      });
    }

    return elementsToRender;
  }

  return (
    <Menu
      sx={{
        mt: "42px",
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
          <div>{Results(subscribedToEvents)}</div>
        </div>
      </div>
    </Menu>
  );
}
