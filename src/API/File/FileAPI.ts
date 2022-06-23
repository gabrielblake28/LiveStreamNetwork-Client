import axios, { AxiosInstance } from "axios";
import IFileAPI from "./IFileAPI";
import { IFile } from "./IFile";

export class FileAPI implements IFileAPI {
  private readonly query: AxiosInstance;
  constructor() {
    this.query = axios.create({
      baseURL:
        process.env.NODE_ENV == "production"
          ? ""
          : "http://localhost:3500/image_upload",
    });
  }

  async UploadFile(resource: IFile): Promise<string> {
    return await await (
      await this.query.post("/", { resource })
    ).data;
  }
}
