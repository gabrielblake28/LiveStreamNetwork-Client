import { IFeedback } from "./IFeedback";

export default interface IFeedbackAPI {
    CreateFeedback(resource: IFeedback): Promise<string>;
}