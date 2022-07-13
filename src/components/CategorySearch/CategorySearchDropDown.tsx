import CategorySearchResultsCard from "./CategorySearchResultsCard";
import "./CategorySearchBar.css";
import EventsSearchCard from "../SearchBar/SearchCards/EventsSearchCard";
import { SearchResult } from "../../API/Search/SearchResult";
import EmptySearch from "../SearchBar/SearchCards/EmptySearch";
import { IEvent } from "../../API/Events/IEvent";

type CategorySearchDropDownProps = {
  showSearchDropDown: string;
  searchData: SearchResult[];
  setShowSearchDropDown: Function;
  setSearchBarBorderColor: Function;
};

export default function CategorySearchDropDown({
  searchData,
  showSearchDropDown,
  setShowSearchDropDown,
  setSearchBarBorderColor,
}: CategorySearchDropDownProps) {
  function ResultsType(searchResults: SearchResult[]): JSX.Element[] {
    const elementsToRender: JSX.Element[] = [];

    searchResults.forEach((result) => {
      if (result.Identifier == "events") {
        result.Result.forEach((data: Partial<IEvent>) => {
          elementsToRender.push(
            <EventsSearchCard
              SearchResult={data}
              key={data.event_id}
              setShowSearchDropDown={setShowSearchDropDown}
            />
          );
        });
      }
    });

    if (elementsToRender.length == 0) {
      elementsToRender.push(<EmptySearch />);
    }

    return elementsToRender;
  }

  const handleScroll = () => {
    setShowSearchDropDown("none");
  };

  return (
    <div
      className="category-drop-down-container"
      onScroll={handleScroll}
      style={{
        display: `${showSearchDropDown}`,
      }}
    >
      <div className="category-search-data-container">
        {ResultsType(searchData)}
      </div>
    </div>
  );
}
