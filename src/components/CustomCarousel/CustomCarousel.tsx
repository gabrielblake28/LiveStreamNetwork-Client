import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./CustomCarousel.css";
import { useState } from "react";
import { EventCards } from "./CarouselData";
import EventCard from "../EventCard/EventCard";

const CustomCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlides = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlides = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="carousel">
      <ArrowBackIosNewRoundedIcon
        style={{ color: "#a265fd" }}
        className="left-arrow"
        onClick={prevSlides}
      />
      <ArrowForwardIosRoundedIcon
        style={{ color: "#a265fd" }}
        className="right-arrow"
        onClick={nextSlides}
      />

      {EventCards.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div className="events-direction-row">
                <EventCard
                  eventTitle={slide[0].eventTitle}
                  creatorName={slide[0].creatorName}
                  eventTime={slide[0].eventTime}
                  eventImg={slide[0].eventImg}
                  profilePic={slide[0].profilePic}
                />
                <EventCard
                  eventTitle={slide[1].eventTitle}
                  creatorName={slide[1].creatorName}
                  eventTime={slide[1].eventTime}
                  eventImg={slide[1].eventImg}
                  profilePic={slide[1].profilePic}
                />
                <EventCard
                  eventTitle={slide[2].eventTitle}
                  creatorName={slide[2].creatorName}
                  eventTime={slide[2].eventTime}
                  eventImg={slide[2].eventImg}
                  profilePic={slide[2].profilePic}
                />
                <EventCard
                  eventTitle={slide[3].eventTitle}
                  creatorName={slide[3].creatorName}
                  eventTime={slide[3].eventTime}
                  eventImg={slide[3].eventImg}
                  profilePic={slide[3].profilePic}
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CustomCarousel;
