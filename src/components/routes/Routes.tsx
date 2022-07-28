import { Routes, Route } from "react-router";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import { UpcomingEventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import EventScrollPage from "../EventLandingPage/EventLandingPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserPage from "../UserPage/UserPage";
import BrowsePage from "../BrowsePage/BrowsePage";

type RouterProps = {
  ParentRef?: HTMLDivElement;
};

export default function Router({ ParentRef }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="event" element={<EventDetailsPage />} />
      <Route path="browse" element={<BrowsePage ParentRef={ParentRef} />} />
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}
