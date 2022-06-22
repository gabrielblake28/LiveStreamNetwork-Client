import { NotificationsActive, SubscriptTwoTone } from "@mui/icons-material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useEffect, useState } from "react";
import { SubscriptionAPI } from "../../API/Subscriptions/SubscriptionAPI";

const subscriptions = new SubscriptionAPI();

type SubscriptionComponentProps = {
  EventId: string;
  SubscriptionId?: string;
};

export function SubscriptionComponent({
  EventId,
  SubscriptionId,
}: SubscriptionComponentProps) {
  const [subscriptionId, setSubscriptionId] = useState<string>();

  useEffect(() => {
    setSubscriptionId(SubscriptionId);
  }, [SubscriptionId]);

  const handleClick = () => {
    if (subscriptionId) {
      setSubscriptionId(undefined);
      subscriptions.removeSubscription(subscriptionId);
    } else {
      addSubscriptionAsync();
    }

    async function addSubscriptionAsync() {
      setSubscriptionId(
        await subscriptions.addSubscription({
          event_id: EventId,
          user_id: "1",
        })
      );
    }
  };

  return subscriptionId ? (
    <NotificationsActive
      className="event-footer__bell-icon"
      sx={{ width: "35px", height: "35px", color: "#aaaaaa" }}
      onClick={handleClick}
    />
  ) : (
    <NotificationsNoneOutlinedIcon
      className="event-footer__bell-icon"
      sx={{ width: "35px", height: "35px", color: "#aaaaaa" }}
      onClick={handleClick}
    />
  );
}
