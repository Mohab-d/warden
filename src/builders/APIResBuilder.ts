import AbstractAppError from "../abstracts/AbstractAppError";
import IAPIAuthResponse from "../interface/IAPIAuthResponse";
import IAppError from "../interface/IAppError";

class APIResBuilder {
  success?: boolean;
  httpCode?: number;
  message?: string;
  error?: IAppError<any>;
  authData?: any = {};
  sentAt?: string = new Date().toISOString();

  public setSuccess(success: boolean): this {
    this.success = success;
    return this;
  }

  public setHttpCode(code: number): this {
    this.httpCode = code;
    return this;
  }

  public setMessage(message: string): this {
    this.message = message;
    return this;
  }

  public setError(error: AbstractAppError<any>): this {
    this.error = error.getFormat();
    return this;
  }

  public setAuthData(data: any): this {
    this.authData = data;
    return this;
  }

  public setSentAt(ISOTimestamp: string): this {
    this.sentAt = ISOTimestamp;
    return this;
  }

  public build(): IAPIAuthResponse<any> {
    return {
      success: this.success ?? false,
      httpCode: this.httpCode ?? 500,
      message: this.message ?? "No message was provided for Response builder",
      error: this.error,
      authData: this.authData ?? {},
      sentAt: this.sentAt!,
    };
  }
}

export default APIResBuilder;
