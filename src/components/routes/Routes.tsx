import { Routes, Route } from "react-router";
import { useRecoilValue } from "recoil";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";
import { EventProvider } from "../../Service/InfiniteScrollService/impl/EventProvider";
import EventDetailsPage from "../EventDetailsPage/EventDetailsPage";
import EventScrollPage from "../EventLandingPage/EventLandingPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import UserPage from "../UserPage/UserPage";
import BrowsePage from "../BrowsePage/BrowsePage";

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
          <BrowsePage
            ParentRef={ParentRef}
            EventProvider={new EventProvider(user?.user_id as string)}
          />
        }
      />
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}
