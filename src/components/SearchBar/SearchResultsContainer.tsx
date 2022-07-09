import { IEvent } from "../../API/Events/IEvent";
import { SearchResult } from "../../API/Search/SearchResult";
import { IUser } from "../../API/Users/IUser";
import EmptySearch from "./SearchCards/EmptySearch";
import EventsSearchCard from "./SearchCards/EventsSearchCard";
import UsersSearchCard from "./SearchCards/UsersSearchCard";

type SearchResultsViewProps = {
  searchData: SearchResult[];
  setShowSearchDropDown: Function;
};

export default function SearchResultsContainer({
  searchData,
  setShowSearchDropDown,
}: SearchResultsViewProps) {
  function ResultsType(searchResults: SearchResult[]): JSX.Element[] {
    const elementsToRender: JSX.Element[] = [];

    searchResults.forEach((result) => {
      if (result.Identifier == "users") {
        result.Result.forEach((data: Partial<IUser>) => {
          elementsToRender.push(
            <UsersSearchCard
              SearchResult={data}
              key={data.user_id}
              setShowSearchDropDown={setShowSearchDropDown}
            />
          );
        });
      }

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
  return <div>{ResultsType(searchData)}</div>;
}
