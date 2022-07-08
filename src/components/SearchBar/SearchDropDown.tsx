import {
  createTheme,
  styled,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  SearchType,
  ShowSearchDropDown,
} from "../../Recoil/Search/SearchAtoms";
import "./SearchBar.css";
import SearchResults from "./SearchResults";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AntTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    margin: "17px 0",
    backgroundColor: "#9552fa",
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
  // padding: "0 20px",
  color: "#aaaaaa",
  "&:hover": {
    color: "#9552fa",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#9552fa",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#ac77fc",
  },
}));

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

export default function SearchDropDown() {
  const [value, setValue] = useState<string>("all");
  const showSearchDropDown = useRecoilValue(ShowSearchDropDown);
  const setSearchType = useSetRecoilState(SearchType);

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
                  Users
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
        <SearchResults></SearchResults>
      </div>
    </div>
  );
}
