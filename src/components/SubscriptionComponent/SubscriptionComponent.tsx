import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useEffect, useState } from "react";
import { SubscriptionAPI } from "../../API/Subscriptions/SubscriptionAPI";

const subscriptions = new SubscriptionAPI();

type SubscriptionComponentProps = {
  EventId: string;
};
export function SubscriptionComponent({ EventId }: SubscriptionComponentProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    GetSubscriptions().then((result) => {
      setIsSubscribed(!!result);
    });

    async function GetSubscriptions() {
      return await subscriptions.getSubscription(EventId);
    }
  }, [EventId]);

  return (
    <NotificationsNoneOutlinedIcon
      className="event-footer__bell-icon"
      sx={{ width: "35px", height: "35px", color: "#aaaaaa" }}
    />
  );
}
