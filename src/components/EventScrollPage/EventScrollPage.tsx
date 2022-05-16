import "./EventScrollPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { FeaturedEvents, UpcomingEvents } from "../Atoms/Atoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import CategoryCard from "../CategoryCard/CategoryCards";
import Fortnite from "../../assets/Categories/Fortnite.jpg";
import ApexLegends from "../../assets/Categories/Apex.jpg";
import JustChatting from "../../assets/Categories/JustChatting.jpg";
import PoE from "../../assets/Categories/PoE.jpg";
import Valorant from "../../assets/Categories/Valorant.jpg";
import Wow from "../../assets/Categories/Wow.jpg";
import AmongUs from "../../assets/Categories/AmongUs.jpg";
import { Typography } from "@mui/material";
import { CategoryCardData } from "../CategoryCard/CategoryCardData";

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
        <CustomCarousel slideTitle={"Sponsored"} slides={upcomingEvents} />
        <CustomCarousel slideTitle={"Upcoming"} slides={featuredEvents} />
      </div>
      <div className="category-section">
        {CategoryCardData.map((card, index) => {
          return (
            <div>
              <CategoryCard
                category={card.category}
                categoryImage={card.categoryImage}
              />
            </div>
          );
        })}
      </div>

      <div className="infinite-scroll-section"></div>
    </div>
  );
}
