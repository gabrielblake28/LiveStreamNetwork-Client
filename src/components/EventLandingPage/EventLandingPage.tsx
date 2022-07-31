import "./EventLandingPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { FeaturedEvents, UpcomingEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import { CurrentUserData } from "../../Recoil/Users/UserAtoms";

export default function EventLandingPage() {
  const [featuredEvents, setFeaturedEvents] = useState<IEvent[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<IEvent[]>([]);
  const userData = useRecoilValue(CurrentUserData);

  useEffect(() => {
    const api = new EventAPI();

    api
      .GetFeaturedEvents(24, 0, userData?.user_id ?? "0")
      .then((result: IEvent[]) => {
        console.log(featuredEvents, result);
        setFeaturedEvents(() => result);
      });

    api
      .GetTrendingEvents(24, 0, userData?.user_id ?? "0")
      .then((result: IEvent[]) => {
        console.log(trendingEvents, result);
        setTrendingEvents(() => result);
      });
  }, [userData]);
  return (
    <div>
      <div className="carousel-section">
        <CustomCarousel slideTitle={"Featured"} slides={featuredEvents} />
        <CustomCarousel slideTitle={"Popular"} slides={trendingEvents} />
        <CustomCarousel slideTitle={"Sponsored"} slides={[]} />
      </div>
      <div
        style={{
          margin: "50px",
        }}
      />
    </div>
  );
}
