import { Typography } from "@mui/material";
import search from "../../../assets/illustrations/search.svg";
import "./SearchCards.css";

export default function EmptySearch() {
  return (
    <div className="empty-search-container">
      <div>
        <img height="250px" width="200px" src={search} />
      </div>
      <div>
        <Typography
          sx={{
            fontFamily: "Source Sans Pro",
            fontSize: "17px",
            color: "#aaaaaa",
          }}
        >
          No Search Results
        </Typography>
      </div>
    </div>
  );
}
