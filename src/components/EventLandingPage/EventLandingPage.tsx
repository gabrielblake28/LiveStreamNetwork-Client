import "./EventLandingPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import { FeaturedEvents, UpcomingEvents } from "../../Recoil/Events/EventAtoms";
import { EventAPI } from "../../API/Events/EventAPI";
import { IEvent } from "../../API/Events/IEvent";
import CategoryCard from "../CategoryCard/CategoryCards";
import { Divider, Typography } from "@mui/material";
import { CategoryCardData } from "../CategoryCard/CategoryCardData";
import { InfiniteScrollContainer } from "../InfiniteScroll/InfiniteScrollContainer";
import { InfiniteScrollPage } from "../InfiniteScroll/InfiniteScrollPage";

export default function EventLandingPage() {
  const featuredEvents = useRecoilValue(FeaturedEvents);
  const setFeaturedEvents = useSetRecoilState(FeaturedEvents);
  const upcomingEvents = useRecoilValue(UpcomingEvents);
  const setUpcomingEvents = useSetRecoilState(UpcomingEvents);

  useEffect(() => {
    const api = new EventAPI();

    api.GetFeaturedEvents(24, 1, "1").then((result: IEvent[]) => {
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
      <Divider
        variant="middle"
        style={{
          margin: "60px 150px 0 150px",
          backgroundColor: "#aaaaaa",
        }}
      />
      <div className="category-section-container">
        <div className="category-section-title">
          <Typography
            variant="h5"
            style={{
              color: "white",
              fontFamily: "Source Sans Pro",
            }}
          >
            Categories
          </Typography>
        </div>
        <div className="category-section">
          {CategoryCardData.map((card, index) => {
            return (
              <CategoryCard
                category={card.category}
                categoryImage={card.categoryImage}
              />
            );
          })}
        </div>
      </div>
      <div className="all-events-section"></div>

      <div className="infinite-scroll-section">
        <InfiniteScrollContainer />
      </div>
    </div>
  );
}
