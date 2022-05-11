import { atom } from "recoil";
import { IEvent } from "../../API/Events/IEvent";


export const homeIconState = atom({
  key: "homeIconState",
  default: true,
});

export const FeaturedEvents = atom({
  key: 'FeaturedEvents',
  default: [] as IEvent[],
});

