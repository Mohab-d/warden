import { IAppError } from "../../errorHandler";

interface IAPIAuthResponse<T> {
  success: boolean;
  httpCode: number;
  message: string;
  error?: IAppError<any>;
  authData?: T;
  sentAt: string;
}

export { IAPIAuthResponse };
