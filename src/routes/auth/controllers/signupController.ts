import { NextFunction, Request, Response } from "express";
import APIResBuilder from "../../../builders/APIResBuilder";
import authStrategiesRegistry from "../../../registries/AuthStrategiesRegistry";

function signupController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authStrategy = authStrategiesRegistry.getStrategy(clientType);

      const newCustomer = await authStrategy.signup(req.body);

      const response = new APIResBuilder()
        .setHttpCode(200)
        .setSuccess(true)
        .setMessage(`New ${clientType} saved`)
        .setAuthData(newCustomer)
        .setSentAt(new Date().toISOString())
        .setAuthData({
          accessToken: newCustomer.accessToken,
          refreshToken: newCustomer.refreshToken,
        })
        .build();

      res.status(response.httpCode).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default signupController;
