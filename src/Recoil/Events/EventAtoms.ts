import { atom, selector } from "recoil";
import { IEvent } from "../../API/Events/IEvent";
import { EventAPI } from "../../API/Events/EventAPI";
import { NavButtonStatus } from "../../components/NavButtonStatus/NavButtonStatus";

const eventApi = new EventAPI();

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

// Events Atoms

export const EventTitleState = atom({
  key: "EventTitle",
  default: "" as string,
});

export const EventStartTimeState = atom({
  key: "EventStartTime",
  default: new Date() as Date,
});
export const EventEndTimeState = atom({
  key: "EventEndTime",
  default: new Date() as Date,
});

export const EventDescriptionState = atom({
  key: "EventDescription",
  default: "" as string,
});
