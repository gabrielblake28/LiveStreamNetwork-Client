import "./EventLandingPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { FeaturedEvents, UpcomingEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

export default function EventLandingPage() {
  const featuredEvents = useRecoilValue(FeaturedEvents);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const upcomingEvents = useRecoilValue(UpcomingEvents);
  const setUpcomingEvents = useSetRecoilState(UpcomingEvents);

  useEffect(() => {
    const api = new EventAPI();

    api.GetFeaturedEvents(24, 1, "1").then((result: IEvent[]) => {
      setFeaturedEvents(() => result);
      console.log(featuredEvents);
    });
  }, []);
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
