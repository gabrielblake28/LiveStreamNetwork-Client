import {
  ClickAwayListener,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import "./SearchBar.css";
import { SearchAPI } from "../../API/Search/SearchAPI";
import { SearchResult } from "../../API/Search/SearchResult";
const searchApi = new SearchAPI();

let timeout: NodeJS.Timeout;
export default function SearchBar() {
  const [term, setTerm] = useState<string>("");
  const [searchBarColor, setSearchBarColor] = useState<string>("#464648");
  const [showClear, setShowClear] = useState(false);
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<string>("all");
  const [showSearchDropDown, setShowSearchDropDown] = useState<string>("none");
  const [searchBarBorderColor, setSearchBarBorderColor] =
    useState<string>("#464648");

  const handleClickAway = () => {
    setSearchBarColor("#464648");
    setSearchBarBorderColor("#464648");
    setShowSearchDropDown("none");
  };

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (term != "") {
        searchApi.Search(term, searchType).then((response) => {
          setSearchData(response);
        });
      } else {
        setSearchData([]);
      }
    }, 250);
  }, [term]);
  useEffect(() => {
    clearTimeout(timeout);
    if (term != "") {
      timeout = setTimeout(() => {
        searchApi.Search(term, searchType).then((response) => {
          setSearchData(response);
        });
      }, 250);
    } else {
      setSearchData([]);
    }
  }, [searchType]);

  return (
    <div className="search-bar-z-index">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Paper
            component="form"
            sx={{
              p: "px 02px",
              display: "flex",
              alignItems: "center",
              height: 36,
              width: 380,
              backgroundColor: `${searchBarColor}`,
              border: `2px solid ${searchBarBorderColor}`,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#EFEFF1" }}
              placeholder="Search"
              autoComplete="true"
              value={term}
              onFocus={(e) => {
                setSearchBarColor("black");
                setSearchBarBorderColor("#9552fa");
                setShowSearchDropDown("flex");
                setShowClear(true);
              }}
              onChange={(e) => {
                const term = e.target.value;
                setTerm(e.target.value);
              }}
              type="string"
            />
            <Divider sx={{ height: "36" }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px", color: "#EFEFF1" }}
              aria-label="directions"
              onClick={() => {
                setTerm("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Paper>
          <SearchDropDown
            setSearchType={setSearchType}
            searchData={searchData}
            showSearchDropDown={showSearchDropDown}
            setShowSearchDropDown={setShowSearchDropDown}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
}
