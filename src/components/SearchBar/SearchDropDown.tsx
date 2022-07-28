import {
  createTheme,
  styled,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SearchResult } from "../../API/Search/SearchResult";
import "./SearchBar.css";
import SearchResults from "./SearchResultsContainer";

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    margin: "17px 0",
    backgroundColor: "#eb4034",
    justifyContent: "center",
  },
  "& .MuiButtonBase-root": {
    padding: "0 15px",
    minHeight: "5px",
    height: "30px",
    maxWidth: "45px",
  },
});

interface StyledTabProps {
  label: any;
  value: string;
  onClick: any;
}

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(0),
  color: "#aaaaaa",
  "&:hover": {
    color: "#fff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#ffffff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#CF5579",
  },
}));

const tabsTheme = createTheme({
  palette: {
    primary: {
      main: "#CF5579",
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

type SearchDropDownProps = {
  setSearchType: Function;
  searchData: SearchResult[];
  showSearchDropDown: string;
  setShowSearchDropDown: Function;
};

export default function SearchDropDown({
  setSearchType,
  searchData,
  showSearchDropDown,
  setShowSearchDropDown,
}: SearchDropDownProps) {
  const [value, setValue] = useState<string>("all");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div
      className="search-drop-down-container"
      style={{
        display: `${showSearchDropDown}`,
      }}
    >
      <div className="search-type-tabs">
        <ThemeProvider theme={tabsTheme}>
          <AntTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
          >
            <AntTab
              onClick={() => {
                setSearchType("all");
              }}
              label={
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "Source Sans Pro", fontSize: "10px" }}
                >
                  All
                </Typography>
              }
              value="all"
            />
            <AntTab
              onClick={() => {
                setSearchType("users");
              }}
              label={
                <Typography
                  sx={{ fontFamily: "Source Sans Pro", fontSize: "10px" }}
                >
                  Creators
                </Typography>
              }
              value="users"
            />
            <AntTab
              onClick={() => {
                setSearchType("events");
              }}
              label={
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "Source Sans Pro", fontSize: "10px" }}
                >
                  Events
                </Typography>
              }
              value="events"
            />
          </AntTabs>
        </ThemeProvider>
      </div>
      <div className="search-data-container">
        <SearchResults
          searchData={searchData}
          setShowSearchDropDown={setShowSearchDropDown}
        ></SearchResults>
      </div>
    </div>
  );
}
