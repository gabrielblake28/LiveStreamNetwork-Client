import axios, { AxiosInstance } from "axios";
import IFeedbackAPI from "../def/IFeedbackAPI";
import { IFeedback } from "../def/IFeedback";

export class FeedbackAPI implements IFeedbackAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? ""
          : "http://localhost:3500/feedback",
    });
  }

  async CreateFeedback(resource: IFeedback): Promise<string> {
    return await await (
      await this.query.post("/", resource)
    ).data;
  }
}
