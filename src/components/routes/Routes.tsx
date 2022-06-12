import { Routes, Route } from "react-router";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import EventScrollPage from "../EventLandingPage/EventLandingPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserPage from "../UserPage/UserPage";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="event" element={<EventDetailsPage />} />
      {/* <Route path="browse" element={<BrowseEventsPage />} /> */}
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}
