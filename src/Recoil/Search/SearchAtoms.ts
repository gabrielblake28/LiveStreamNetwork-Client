import { atom, selector } from "recoil";
import { SearchResult } from "../../API/Search/SearchResult";

export const ShowSearchDropDown = atom<string>({
  key: "ShowSearchDrop",
  default: "none",
});

export const SearchType = atom<string>({
  key: "SearchType",
  default: "all",
});

export const SearchData = atom<SearchResult[]>({
  key: "SearchData",
  default: [],
});
