import { NextFunction, Request, Response } from "express";
import AbstractAppError from "../abstracts/AbstractAppError";
import APIResBuilder from "../builders/APIResBuilder";
import errorsRegistry from "../registries/ErrorHandlingStrategyRegistry";

// TODO: log errors
function errorHandler(
  error: AbstractAppError<any>,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const responseBuilder = new APIResBuilder();

  if (error.isWardenError) {
    const handler = errorsRegistry.getStrategy(error);

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
