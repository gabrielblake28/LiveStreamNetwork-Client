import { Routes, Route } from "react-router";
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
