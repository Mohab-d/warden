import ErrorType from "../errorHandler/ErrorType";

interface IAppError<T> {
  name: string;
  message: string;
  isWardenError: boolean;
  type: ErrorType;
  context?: T;
  createdAt: Date;
}

export default IAppError;
