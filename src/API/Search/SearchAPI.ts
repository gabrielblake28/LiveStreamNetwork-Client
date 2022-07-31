import axios, { AxiosInstance } from "axios";
import { SearchResult } from "./SearchResult";
import ISearchAPI from "./ISearchAPI";

export class SearchAPI implements ISearchAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? "http://localhost:3500/search"
          : "http://localhost:3500/search",
    });
  }
  async Search(term: string, type: string): Promise<SearchResult[]> {
    return await (
      await this.query.get("/", { params: { term, type } })
    ).data;
  }
}
