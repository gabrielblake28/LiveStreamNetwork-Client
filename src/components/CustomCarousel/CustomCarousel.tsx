import "./CustomCarousel.css";
import { useEffect, useLayoutEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import schooled from "../../assets/Thumbnails/schooled.jpg";
import { Typography } from "@mui/material";
import { CarouselController } from "../../Service/CarouselService/impl/CarouselController";
import { Link } from "react-router-dom";

const carouselController = new CarouselController();

let transition = false;

const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default function CustomCarousel({ slides, slideTitle }) {
  const NUM_OF_EVENTS = 24;
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [index, setIndex] = useState(0);
  const [slideTransform, setSlideTransform] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setProgressBar(
      carouselController.CalculateProgressBarLength(windowSize, NUM_OF_EVENTS)
    );

    setSlideTransform(
      -carouselController.CalculateTransform(windowSize, index, NUM_OF_EVENTS)
    );

    setIndex(
      (prev) =>
        prev +
        carouselController.CalculateIndexOnWindowResize(
          windowSize,
          index,
          NUM_OF_EVENTS
        )
    );
  }, [windowSize]);

  useEffect(() => {
    setCarouselPosition(
      carouselController.CalculatePosition(windowSize, index)
    );
  }, [index]);

  const renderProgress = (): React.ReactNode[] => {
    const progress: React.ReactNode[] = [];

    for (let i = 0; i < progressBar; i++) {
      progress.push(
        <div
          className={
            i == carouselPosition ? "progress-item active" : "progress-item"
          }
        ></div>
      );
    }

    return progress;
  };

  return (
    <div>
      <div className="row">
        <div className="section-header">
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: "Source Sans Pro",
            }}
          >
            {slideTitle}
          </Typography>
        </div>
        <div className="progress-bar">{renderProgress()}</div>
      </div>

      <div className="slider-container">
        <button
          style={{
            opacity: `1`,
            cursor: `pointer`,
          }}
          className="handle left-handle"
          onClick={() => {
            if (transition === false) {
              transition = true;
              const movement = carouselController.PrevSlide(
                windowSize,
                index,
                NUM_OF_EVENTS
              );

              setSlideTransform(
                (prevValue) => (prevValue += movement.translation)
              );
              setIndex((prevValue) => (prevValue -= movement.index));

              setTimeout(() => {
                transition = false;
              }, 750);
            }
          }}
        >
          <div className="arrow-text"> &#8249;</div>
        </button>
        <div
          className="slider"
          style={{
            transform: `translateX(${slideTransform}%)`,
          }}
        >
          {slides.map((slide, index) => {
            return (
              <div className="slider-class">
                <EventCard
                  eventTitle={slide.title}
                  creatorName={slide.name || ""}
                  eventTime={slide.start_timestamp}
                  eventImg={slide.image || schooled}
                  profilePic={slide.profilePic || ""}
                />
              </div>
            );
          })}
        </div>
        <button
          style={{
            opacity: `1`,
            cursor: `pointer`,
          }}
          className="handle right-handle"
          onClick={() => {
            if (transition === false) {
              transition = true;

              const movement = carouselController.NextSlide(
                windowSize,
                index,
                NUM_OF_EVENTS
              );

              setSlideTransform(
                (prevValue) => (prevValue -= movement.translation)
              );
              setIndex((prevValue) => (prevValue += movement.index));
              setTimeout(() => {
                transition = false;
              }, 750);
            }
          }}
        >
          <div className="arrow-text">&#8250;</div>
        </button>
      </div>
    </div>
  );
}
