import "./EventScrollPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { EventCards } from "../CustomCarousel/CarouselData";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { features } from "process";
import { FeaturedEvents, UpcomingEvents } from "../Atoms/Atoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";

export default function EventScrollPage() {
  const featuredEvents = useRecoilValue(FeaturedEvents);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const upcomingEvents = useRecoilValue(UpcomingEvents);
  const setUpcomingEvents = useSetRecoilState(UpcomingEvents);

  useEffect(() => {
    const api = new EventAPI();

    api.GetFeaturedEvents(24, 1).then((result: IEvent[]) => {
      setFeaturedEvents(() => result);
    });
  }, []);
  return (
    <div>
      <div className="carousel-section">
        <CustomCarousel slideTitle={"Featured"} slides={featuredEvents} />
        <CustomCarousel slideTitle={"Popular"} slides={upcomingEvents} />
        <CustomCarousel slideTitle={"Upcoming"} slides={featuredEvents} />
      </div>

      <div className="infinite-scroll-section"></div>
    </div>
  );
}
