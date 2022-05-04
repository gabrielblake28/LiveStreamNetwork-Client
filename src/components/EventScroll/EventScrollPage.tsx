import { Divider, Typography } from "@mui/material";
import EventCard from "../EventCard/EventCard";
import "./EventScrollPage.css";
import CustomCarousel from "../CustomCarousel/CustomCarousel";
import { EventCards } from "../CustomCarousel/CarouselData";
import mizkif from "../../assets/mizkif.jpg";
import mock1 from "../../assets/mockTN1.jpg";
import mock2 from "../../assets/mockTN2.jpg";
import mock3 from "../../assets/mockTN3.jpg";
import schooled from "../../assets/schooled.jpg";
import awards from "../../assets/awards.jpg";
import qt from "../../assets/qt.jpg";
import maya from "../../assets/maya.jpg";
import alveus from "../../assets/alveus.jpg";
import asmon from "../../assets/asmon.jpg";
import transmog from "../../assets/transmog.jpg";
import EventCarousel from "../EventCarousel/EventCarousel";

// const queryString = window.location.search;

// const urlParams = new URLSearchParams(queryString);

// const code = urlParams.get("code");
// console.log(code);

// scopes:    channel:edit:commercial
console.log(document.location.hash);
export default function EventScrollPage() {
  return (
    <div>
      <div className="carousel-section">
        <Typography
          variant="h5"
          sx={{
            marginLeft: "25px",
            marginTop: "25px",
            color: "white",
            fontFamily: "Source Sans Pro",
          }}
        >
          Featured
        </Typography>
        <CustomCarousel slides={EventCards} />
      </div>
      <div className="carousel-section">
        <Typography
          variant="h5"
          sx={{
            marginLeft: "25px",
            color: "white",
            fontFamily: "Source Sans Pro",
          }}
        >
          Rising
        </Typography>
        <CustomCarousel slides={EventCards} />
      </div>
      {/* <EventCarousel sectionTitle={"Upcoming Events"}></EventCarousel>

      <EventCarousel sectionTitle={"Sponsored"}></EventCarousel>
      <EventCarousel sectionTitle={"All"}></EventCarousel> */}
    </div>
  );
}
