import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IInvalidRefreshTokenContext } from "../contextTypes/IInvalidRefreshTokenContext";
import { IInvalidSchemaContext } from "../contextTypes/IInvalidSchemaContext";
import { IOverflowContext } from "../contextTypes/IOverflowContext";
import { IUnknownOperationContext } from "../contextTypes/IUnknownOperationContext";
import { ErrorType } from "../ErrorType";

class WardenError<T> extends AbstractAppError<T> {
  public static invalidSchema(
    context?: IInvalidSchemaContext,
  ): WardenError<IInvalidSchemaContext> {
    return new WardenError<IInvalidSchemaContext>(
      "InvalidSchema",
      "Request sent does not match defined schema",
      true,
      ErrorType.ERR_INVALID_SCHEMA,
      context,
    );
  }

  public static unknownOperation(
    context?: IUnknownOperationContext,
  ): WardenError<any> {
    return new WardenError(
      "unknownOperation",
      `You tried to perform an unknown operation`,
      true,
      ErrorType.ERR_UNKNOWN_OPERATION,
      context,
    );
  }

  public static missingProperty(context?: any): WardenError<any> {
    return new WardenError(
      "MissingProperty",
      "You did not provide some required properties",
      true,
      ErrorType.ERR_NO_Data,
      context,
    );
  }

  public static invalidToken(
    context?: IInvalidRefreshTokenContext,
  ): WardenError<any> {
    return new WardenError(
      "InvalidToken",
      "This token is invalid, you need to login again",
      true,
      ErrorType.ERR_INVALID_TOKEN,
      context,
    );
  }

  public static invalidKey(context?: any): WardenError<any> {
    return new WardenError(
      "InvalidKey",
      "This key is invalid, you need to generate a new valid one",
      true,
      ErrorType.ERR_INVALID_KEY,
      context,
    );
  }

  public static incorrectCredentials(context?: any): WardenError<any> {
    return new WardenError(
      "IncorrectCredentials",
      `Login credentials incorrect` +
        `${context ? ", check 'context' to learn more" : null}`,
      true,
      ErrorType.ERR_NO_Data,
      context,
    );
  }

  public static noRecord(context?: any): WardenError<any> {
    return new WardenError(
      "RecordNotExist",
      `There is no such record` +
        `${context ? ", check the context to learn more" : null}`,
      true,
      ErrorType.ERR_NO_RECORD,
      context,
    );
  }

  public static duplicatedRecord(context?: any): WardenError<any> {
    return new WardenError(
      "ValueExist",
      `You provided some data that already exist in the database and can not have duplicates`,
      true,
      ErrorType.ERR_VALUE_EXIST,
      context,
    );
  }

  public static overflowError(context?: IOverflowContext): WardenError<any> {
    return new WardenError(
      "OverflowError",
      "You provided some data that caused a limit overflow",
      true,
      ErrorType.ERR_OVERFLOW,
      context,
    );
  }
}

export { WardenError };
