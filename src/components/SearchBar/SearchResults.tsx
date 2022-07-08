import { useRecoilValue } from "recoil";
import { IEvent } from "../../API/Events/IEvent";
import { SearchResult } from "../../API/Search/SearchResult";
import { IUser } from "../../API/Users/IUser";
import { SearchData, SearchType } from "../../Recoil/Search/SearchAtoms";
import EmptySearch from "./SearchCards/EmptySearch";
import EventsSearchCard from "./SearchCards/EventsSearchCard";
import UsersSearchCard from "./SearchCards/UsersSearchCard";

export default function SearchResults() {
  const searchData = useRecoilValue(SearchData);
  const searchType = useRecoilValue(SearchType);
  function ResultsType(searchResults: SearchResult[]): JSX.Element[] {
    const elementsToRender: JSX.Element[] = [];

    searchResults.forEach((result) => {
      if (result.Identifier == "users") {
        result.Result.forEach((data: Partial<IUser>) => {
          elementsToRender.push(
            <UsersSearchCard SearchResult={data} key={data.user_id} />
          );
        });
      }

      if (result.Identifier == "events") {
        result.Result.forEach((data: Partial<IEvent>) => {
          elementsToRender.push(
            <EventsSearchCard SearchResult={data} key={data.event_id} />
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
