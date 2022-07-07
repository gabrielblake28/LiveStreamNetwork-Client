import {
  ClickAwayListener,
  createTheme,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  SearchData,
  SearchType,
  ShowSearchDropDown,
} from "../../Recoil/Search/SearchAtoms";
import "./SearchBar.css";
import { SearchAPI } from "../../API/Search/SearchAPI";
const searchApi = new SearchAPI();

const tabsTheme = createTheme({
  palette: {
    primary: {
      main: "#9552fa",
    },
    secondary: {
      main: "#aaaaaa",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#aaaaaa",
        },
      },
    },
  },
});

let timeout: NodeJS.Timeout;
export default function SearchBar() {
  const [term, setTerm] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchBarColor, setSearchBarColor] = useState<string>("#464648");
  const setShowSearchDropDown = useSetRecoilState(ShowSearchDropDown);
  const setSearchData = useSetRecoilState(SearchData);
  const searchType = useRecoilValue(SearchType);

  const handleClickAway = () => {
    setSearchBarColor("#464648");
    setShowSearchDropDown("none");
  };

  useEffect(() => {
    if (anchorEl === null) {
      setSearchBarColor("#464648");
    } else {
      setSearchBarColor("black");
    }
  }, [anchorEl]);

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      searchApi.Search(term, searchType).then((response) => {
        setSearchData(response);
      });
    }, 250);
  }, [term]);
  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      searchApi.Search(term, searchType).then((response) => {
        setSearchData(response);
      });
    }, 250);
    console.log(searchType);
  }, [searchType]);

  return (
    <div className="search-bar-z-index">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="search-bar-component-container">
          <Paper
            component="form"
            sx={{
              p: "px 02px",
              display: "flex",
              alignItems: "center",
              height: 36,
              width: 380,
              backgroundColor: `${searchBarColor}`,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#EFEFF1" }}
              placeholder="Search"
              autoComplete="false"
              value={term}
              onFocus={(e) => {
                setSearchBarColor("black");
                setShowSearchDropDown("flex");
              }}
              onChange={(e) => {
                const term = e.target.value;
                setTerm(e.target.value);
              }}
              type="sting"
            />
            <Divider sx={{ height: "36" }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px", color: "#EFEFF1" }}
              aria-label="directions"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <SearchDropDown />
        </div>
      </ClickAwayListener>
    </div>
  );
}
