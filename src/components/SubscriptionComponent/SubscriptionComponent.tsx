import { NotificationsActive, SubscriptTwoTone } from "@mui/icons-material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SubscriptionAPI } from "../../API/Subscriptions/SubscriptionAPI";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import "./SubscriptionComponent.css";

const subscriptions = new SubscriptionAPI();

type SubscriptionComponentProps = {
  EventId: string;
  SubscriptionId?: string;
};

export function SubscriptionComponent({
  EventId,
  SubscriptionId,
}: SubscriptionComponentProps) {
  const userInfo = useRecoilValue(CurrentUserData);
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
          user_id: userInfo.user_id,
        })
      );
    }
  };

  return subscriptionId ? (
    <NotificationsActive
      className="event-footer__bell-icon bounce"
      sx={{
        width: "30px",
        height: "30px",
        color: "#CF5579",
      }}
      onClick={handleClick}
    />
  ) : (
    <NotificationsNoneOutlinedIcon
      className="event-footer__bell-icon"
      sx={{
        width: "30px",
        height: "30px",
        color: "#aaaaaa",
      }}
      onClick={handleClick}
    />
  );
}
