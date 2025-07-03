import { NextFunction, Request, Response } from "express";
import APIResBuilder from "../../../builders/APIResBuilder";
import authStrategiesRegistry from "../../../registries/AuthStrategiesRegistry";

function signupController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authStrategy = authStrategiesRegistry.getStrategy(clientType);

      const newClientAuthData = await authStrategy.signup(req.body);

      const response = new APIResBuilder()
        .setHttpCode(200)
        .setSuccess(true)
        .setMessage(`New ${clientType} saved`)
        .setAuthData(newClientAuthData)
        .setSentAt(new Date().toISOString())
        .setAuthData(newClientAuthData)
        .build();

      res.status(response.httpCode).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default signupController;
