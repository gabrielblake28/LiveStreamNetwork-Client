import "./CustomCarousel.css";
import { useEffect, useLayoutEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import schooled from "../../assets/Thumbnails/schooled.jpg";
import { Typography } from "@mui/material";
import { CarouselController } from "../../Service/CarouselService/impl/CarouselController";
import { Link } from "react-router-dom";
import { IEvent } from "../../API/Events/IEvent";

type CustomCarouselProps = {
  slides: IEvent[];
  slideTitle: string;
};

const carouselController = new CarouselController();

let transition = false;

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return width;
};

export const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);
  useLayoutEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  });
};

export default function CustomCarousel({
  slides,
  slideTitle,
}: CustomCarouselProps) {
  const NUM_OF_EVENTS = 24;
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [index, setIndex] = useState(0);
  const [slideTransform, setSlideTransform] = useState(0);
  const windowSize = useWindowWidth();

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
            sx={{
              color: "#fff",
              fontSize: "20px",
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
                <EventCard key={index} Event={slide} />
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
