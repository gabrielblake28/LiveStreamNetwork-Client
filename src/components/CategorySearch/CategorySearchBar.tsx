import {
  ClickAwayListener,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SearchAPI } from "../../API/Search/SearchAPI";
import { SearchResult } from "../../API/Search/SearchResult";
import "./CategorySearchBar.css";
import CategorySearchDropDown from "./CategorySearchDropDown";

const searchApi = new SearchAPI();

let timeout: NodeJS.Timeout;
export default function CategorySearchBar() {
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [showSearchDropDown, setShowSearchDropDown] = useState<string>("none");
  const [searchBarBorderColor, setSearchBarBorderColor] =
    useState<string>("#101012");
  const [term, setTerm] = useState<string>("");

  const handleClickAway = () => {
    setShowSearchDropDown("none");
    setSearchBarBorderColor("101012");
  };

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (term != "") {
        searchApi.Search(term, "events").then((response) => {
          setSearchData(response);
        });
      } else {
        setSearchData([]);
      }
    }, 250);
  }, [term]);

  return (
    <div className="category-search-container">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Paper
            component="form"
            sx={{
              p: "px 02px",
              display: "flex",
              alignItems: "center",
              height: 40,
              width: 318,
              backgroundColor: "#26262b",
              border: `2px solid ${searchBarBorderColor}`,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#aaaaaa" }}
              placeholder="Search Events"
              autoComplete="true"
              value={term}
              onFocus={(e) => {
                setSearchBarBorderColor("#9552fa");
                setShowSearchDropDown("flex");
              }}
              onChange={(e) => {
                const term = e.target.value;
                setTerm(e.target.value);
              }}
              type="string"
            />
          </Paper>
          <CategorySearchDropDown
            searchData={searchData}
            setShowSearchDropDown={setShowSearchDropDown}
            showSearchDropDown={showSearchDropDown}
            setSearchBarBorderColor={setSearchBarBorderColor}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
}
