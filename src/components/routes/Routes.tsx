import { Routes, Route } from "react-router";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import EventScrollPage from "../EventLandingPage/EventLandingPage";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserPage from "../UserPage/UserPage";

type RouterProps = {
  ParentRef?: HTMLDivElement;
};

export default function Router({ ParentRef }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="event" element={<EventDetailsPage />} />
      <Route
        path="browse"
        element={
          <div style={{ marginTop: "55px" }}>
            {ParentRef ? (
              <InfiniteScrollContainer ScrollParent={ParentRef} />
            ) : (
              <InfiniteScrollContainer />
            )}
          </div>
        }
      />
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}
