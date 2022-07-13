import { Typography } from "@mui/material";
import "./CategorySearchBar.css";

type CategorySearchResultsCardProps = {
  setShowSearchDropDown: Function;
  setSearchBarBorderColor: Function;
};

export default function CategorySearchResultsCard({
  setShowSearchDropDown,
  setSearchBarBorderColor,
}: CategorySearchResultsCardProps) {
  return (
    <div
      className="category-search-results-card-container"
      onClick={() => {
        setShowSearchDropDown("none");
        setSearchBarBorderColor("#101012");
      }}
    >
      <div className="category-search-thumbnail">
        <img src={""} height="35px" width="35px" />
      </div>
      <div className="category-search-title">
        <Typography
          sx={{
            fontFamily: "Source Sans Pro",
            color: "#aaaaaa",
            fontSize: "15px",
          }}
        >
          Just Chatting
        </Typography>
      </div>
    </div>
  );
}
