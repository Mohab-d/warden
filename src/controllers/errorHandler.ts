import { NextFunction, Request, Response } from "express";
import AbstractAppError from "../abstracts/AbstractAppError";
import ErrorHandlingStrategyRegistry from "../registries/ErrorHandlingStrategyRegistry";
import ValueExistErrorStrategy from "../errorHandler/errorHandlingStrategies/ValueExistErrorStrategy";
import ErrorType from "../errorHandler/ErrorType";
import InvalidSchemaHadnlingStrategy from "../errorHandler/errorHandlingStrategies/InvalidSchemaHandlingStrategy";
import APIResBuilder from "../builders/APIResBuilder";
import NoDataErrorHadnlingStrategy from "../errorHandler/errorHandlingStrategies/NoDataErrorHandlingStrategy";
import NoRecordErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/NoRecordErrorHandlingStrategy";

// TODO: log errors
function errorHandler(
  error: AbstractAppError<any>,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const responseBuilder = new APIResBuilder();

  if (error.isWardenError) {
    const handler = errorsRegistry.createHandlingStrategy(error);

    handler.handle(error);

    console.log("Warden error:", error.getFormat());

    const errorResponse = responseBuilder
      .setHttpCode(handler.httpCode)
      .setSuccess(false)
      .setMessage(
        "Your request resulted in an error. Please check the error property below.",
      )
      .setSentAt(new Date().toISOString())
      .setError(error);

    res.status(handler.httpCode).send(errorResponse.build());
  } else {
    console.log(error);

    res
      .status(500)
      .send(
        responseBuilder
          .setHttpCode(500)
          .setSuccess(false)
          .setMessage("Internal error occured")
          .setSentAt(new Date().toISOString())
          .build(),
      );
  }
}

export default errorHandler;

// registering error handling strategies once at initialization
const errorsRegistry = new ErrorHandlingStrategyRegistry()
  .registerStrategy(ErrorType.ERR_VALUE_EXIST, new ValueExistErrorStrategy())
  .registerStrategy(
    ErrorType.ERR_INVALID_SCHEMA,
    new InvalidSchemaHadnlingStrategy(),
  )
  .registerStrategy(ErrorType.ERR_NO_Data, new NoDataErrorHadnlingStrategy())
  .registerStrategy(
    ErrorType.ERR_NO_RECORD,
    new NoRecordErrorHandlingStrategy(),
  );
