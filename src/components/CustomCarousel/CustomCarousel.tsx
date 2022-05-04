import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import "./CustomCarousel.css";
import { useEffect, useState } from "react";
import { EventCards } from "./CarouselData";
import EventCard from "../EventCard/EventCard";
import { Typography } from "@mui/material";

// let transformValue = 0;

export default function CustomCarousel({ slides, slideTitle }) {
  const [slideTransform, setSlideTransform] = useState(0);
  const [leftSliderOpacity, setLeftSliderOpacity] = useState(0);
  const [rightSliderOpacity, setRightSliderOpacity] = useState(1);
  const [leftSliderCursor, setLeftSliderCursor] = useState("default");
  const [rightSliderCursor, setRightSliderCursor] = useState("pointer");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slideTransform === 0) {
      setIndex(0);
      setLeftSliderOpacity(0);
      setLeftSliderCursor("default");
    } else if (slideTransform !== 0) {
      setLeftSliderOpacity(1);
      setLeftSliderCursor("pointer");
    }

    if (index >= slides.length - 4) {
      setRightSliderOpacity(0);
      setRightSliderCursor("default");
    } else if (index < slides.length) {
      setRightSliderOpacity(1);
      setRightSliderCursor("pointer");
    }
  });

  function HandleLeftClick() {
    if (slideTransform !== 0) {
      setSlideTransform(slideTransform + 100);
      setIndex(index - 4);
    }
  }

  function HandleRightClick() {
    if (index < slides.length - 4) {
      setIndex(index + 4);
      setSlideTransform(slideTransform - 100);
    }
  }
  console.log(slides.length);
  console.log(index);
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
          <div className="progress-bar"> </div>
        </div>
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
          {slides.map((slide) => {
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
