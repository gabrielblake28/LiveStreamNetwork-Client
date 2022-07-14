import { atom } from "recoil";
import { IUser } from "../../API/Users/IUser";

export const Authorized = atom({
  key: "Authorized",
  default: false,
});

export const CurrentUserData = atom({
  key: "CurrentUserData",
  default: {} as IUser,
});
