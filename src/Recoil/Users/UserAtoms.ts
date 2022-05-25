import { atom, selector } from "recoil";
import { IUser } from "../../API/Users/IUser";
import mizkif from "../../assets/mizkif.jpg";

export const Authorized = atom({
  key: "Authorized",
  default: false,
});

export const CurrentUserData = atom({
  key: "CurrentUserData",
  default: {} as IUser,
});
