import {
  ClickAwayListener,
  Divider,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useState } from "react";

import "./CategorySearchBar.css";
import CategorySearchDropDown from "./CategorySearchDropDown";

export default function CategorySearchBar() {
  const [showSearchDropDown, setShowSearchDropDown] = useState<string>("none");
  const [searchBarBorderColor, setSearchBarBorderColor] =
    useState<string>("#101012");
  const [term, setTerm] = useState<string>("");

  const handleClickAway = () => {
    setShowSearchDropDown("none");
    setSearchBarBorderColor("101012");
  };

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
              backgroundColor: "#101012",
              border: `2px solid ${searchBarBorderColor}`,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#aaaaaa" }}
              placeholder="Search Categories"
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
            setShowSearchDropDown={setShowSearchDropDown}
            showSearchDropDown={showSearchDropDown}
            setSearchBarBorderColor={setSearchBarBorderColor}
          />
        </div>
      </ClickAwayListener>
    </div>
  );
}
