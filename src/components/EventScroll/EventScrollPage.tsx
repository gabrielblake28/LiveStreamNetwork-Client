import "./EventScrollPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { EventCards } from "../CustomCarousel/CarouselData";

export default function EventScrollPage() {
  return (
    <div>
      <div className="carousel-section">
        <CustomCarousel slideTitle={"Featured"} slides={EventCards} />
        <CustomCarousel slideTitle={"Popular"} slides={EventCards} />
        <CustomCarousel slideTitle={"Upcoming"} slides={EventCards} />
      </div>

      <div className="infinite-scroll-section"></div>
    </div>
  );
}
