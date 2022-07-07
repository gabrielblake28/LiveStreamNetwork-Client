import { SearchResult } from "./SearchResult";

export default interface ISearchAPI {
  Search(term: string, type: string): Promise<SearchResult[]>;
}
