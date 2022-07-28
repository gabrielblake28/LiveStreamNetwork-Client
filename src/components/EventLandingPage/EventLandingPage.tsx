import "./EventLandingPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { FeaturedEvents, UpcomingEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";

export default function EventLandingPage() {
  const featuredEvents = useRecoilValue(FeaturedEvents);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const upcomingEvents = useRecoilValue(UpcomingEvents);
  const setUpcomingEvents = useSetRecoilState(UpcomingEvents);
  const userData = useRecoilValue(CurrentUserData);

  useEffect(() => {
    const api = new EventAPI();

    api
      .GetFeaturedEvents(24, 0, userData?.user_id ?? "0")
      .then((result: IEvent[]) => {
        setFeaturedEvents(() => result);
        console.log(featuredEvents);
      });

    api
      .GetTrendingEvents(24, 0, userData?.user_id ?? "0")
      .then((result: IEvent[]) => {
        setUpcomingEvents(() => result);
      });
  }, [userData]);
  return (
    <div>
      <div className="carousel-section">
        <CustomCarousel slideTitle={"Featured"} slides={featuredEvents} />
        <CustomCarousel slideTitle={"Popular"} slides={upcomingEvents} />
        <CustomCarousel slideTitle={"Sponsored"} slides={upcomingEvents} />
        <CustomCarousel slideTitle={"Upcoming"} slides={featuredEvents} />
      </div>
      <div
        style={{
          margin: "50px",
        }}
      />
    </div>
  );
}
