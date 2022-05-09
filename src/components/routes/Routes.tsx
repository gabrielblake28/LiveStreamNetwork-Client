import { Routes, Route } from "react-router";
import EventScrollPage from "../EventScroll/EventScrollPage";
import ProfilePage from "../ProfilePage/ProfilePage";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
}
