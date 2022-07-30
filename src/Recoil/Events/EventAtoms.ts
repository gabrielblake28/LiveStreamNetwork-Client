import { atom } from "recoil";
import { IEvent } from "../../API/Events/IEvent";
import { NavButtonStatus } from "../../components/NavButtonStatus/NavButtonStatus";


export const homeIconState = atom({
  key: "homeIconState",
  default: true,
});

export const IconState = atom({
  key: "IconState",
  default: NavButtonStatus.HOME,
});

export const FeaturedEvents = atom({
  key: "FeaturedEvents",
  default: [] as IEvent[],
});

export const UpcomingEvents = atom({
  key: "UpcomingEvents",
  default: [] as IEvent[],
});

