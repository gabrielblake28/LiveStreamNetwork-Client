import { Routes, Route } from "react-router";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import { EventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import EventScrollPage from "../EventLandingPage/EventLandingPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserPage from "../UserPage/UserPage";
import BrowsePage from "../BrowsePage/BrowsePage";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";

type RouterProps = {
  ParentRef?: HTMLDivElement;
};

export default function Router({ ParentRef }: RouterProps) {
  const user = useRecoilValue(CurrentUserData);
  return (
    <Routes>
      <Route path="/" element={<EventScrollPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="event" element={<EventDetailsPage />} />
      <Route
        path="browse"
        element={
          <div style={{ marginTop: "55px" }}>
            {ParentRef && user.user_id ? (
              <InfiniteScrollContainer
                ScrollParent={ParentRef}
                EventProvider={new EventProvider(user?.user_id)}
              />
            ) : (
              <></>
            )}
          </div>
        }
      />
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}
