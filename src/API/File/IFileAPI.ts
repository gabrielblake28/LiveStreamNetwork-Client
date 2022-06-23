import { IFile } from "./IFile";

export default interface IFileAPI {
  UploadFile(resource: IFile): Promise<string>;
}
