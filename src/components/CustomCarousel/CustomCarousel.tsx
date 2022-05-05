import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./CustomCarousel.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { EventCards } from "./CarouselData";
import EventCard from "../EventCard/EventCard";
import { Typography } from "@mui/material";
import { sliderUnstyledClasses } from "@mui/base";

window.addEventListener("resize", (e) => {
  // Recalculate progress bar
});

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default function CustomCarousel({ slides, slideTitle }) {
  const [slideTransform, setSlideTransform] = useState(0);
  const [leftSliderOpacity, setLeftSliderOpacity] = useState(0);
  const [leftSliderCursor, setLeftSliderCursor] = useState("default");
  const [rightSliderOpacity, setRightSliderOpacity] = useState(1);
  const [rightSliderCursor, setRightSliderCursor] = useState("pointer");
  const [index, setIndex] = useState(0);
  const [screenSize, setScreenSize] = useWindowSize();
  const [eventsToDisplay, setEventsToDisplay] = useState(7);
  const [progressBar, setProgressBar] = useState(6);
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    console.log(screenSize);
    // console.log(slideTransform);
    if (screenSize > 2200) {
      setEventsToDisplay(7);
      setProgressBar(4);
    } else if (screenSize > 1950) {
      setEventsToDisplay(6);
      setProgressBar(4);
    } else if (screenSize > 1600) {
      setEventsToDisplay(5);
      setProgressBar(5);
    } else if (screenSize >= 1250) {
      setEventsToDisplay(4);
      setProgressBar(6);
    } else if (screenSize >= 900) {
      setEventsToDisplay(8);
      setProgressBar(24 / 3);
    } else if (screenSize >= 550) {
      setEventsToDisplay(2);
      setProgressBar(12);
    } else {
      setEventsToDisplay(1);
      setProgressBar(0);
    }
  });

  useEffect(() => {
    if (slideTransform === 0) {
      // setIndex(0);
      setLeftSliderOpacity(0);
      setLeftSliderCursor("default");
    } else if (slideTransform !== 0) {
      setLeftSliderOpacity(1);
      setLeftSliderCursor("pointer");
    }

    if (index >= slides.length - eventsToDisplay) {
      setRightSliderOpacity(0);
      setRightSliderCursor("default");
    } else if (index < slides.length) {
      setRightSliderOpacity(1);
      setRightSliderCursor("pointer");
    }
  });

  function HandleLeftClick() {
    if (slideTransform % 100 !== 0) {
      setActiveRow(activeRow - 1);
      setIndex(index - eventsToDisplay);
      setSlideTransform(slideTransform - (slideTransform % 100));
    } else if (slideTransform !== 0) {
      setActiveRow(activeRow - 1);
      setIndex(index - eventsToDisplay);
      setSlideTransform(slideTransform + 100);
    }
  }

  function HandleRightClick() {
    if (slideTransform % 100 === 0) {
      setActiveRow(activeRow + 1);
      setIndex(index + eventsToDisplay);
      if (index + eventsToDisplay + eventsToDisplay > slides.length) {
        console.log(index);
        const newTransform =
          (100 / eventsToDisplay) * (slides.length - (index + eventsToDisplay));
        console.log(index);
        console.log(slideTransform);
        console.log(newTransform);
        setSlideTransform(slideTransform - newTransform);
        console.log(slideTransform);
        setRightSliderOpacity(0);
        setRightSliderCursor("default");
      } else if (index < slides.length - eventsToDisplay) {
        setSlideTransform(slideTransform - 100);
        console.log(setSlideTransform(slideTransform - 100));
      }
    }
  }

  const renderProgress = (): React.ReactNode[] => {
    const progress: React.ReactNode[] = [];

    for (let i = 0; i < progressBar; i++) {
      progress.push(
        <div
          className={activeRow === i ? "progress-item active" : "progress-item"}
        ></div>
      );
    }

    return progress;
  };
  console.log(slides.length);
  console.log(index);
  // console.log(eventsToDisplay);
  // console.log(progressBar);
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
            opacity: `${leftSliderOpacity}`,
            cursor: `${leftSliderCursor}`,
          }}
          onClick={HandleLeftClick}
          className="handle left-handle"
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
            // console.log(index);
            return (
              <div className="slider-class">
                <EventCard
                  eventTitle={slide.eventTitle}
                  creatorName={slide.creatorName}
                  eventTime={slide.eventTime}
                  eventImg={slide.eventImg}
                  profilePic={slide.profilePic}
                />
              </div>
            );
          })}
        </div>
        <button
          style={{
            opacity: `${rightSliderOpacity}`,
            cursor: `${rightSliderCursor}`,
          }}
          onClick={HandleRightClick}
          className="handle right-handle"
        >
          <div className="arrow-text">&#8250;</div>
        </button>
      </div>
    </div>
  );
}
