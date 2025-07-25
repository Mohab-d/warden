import { NextFunction, Request, Response } from "express";
import APIResBuilder from "../../../builders/APIResBuilder";
import { AuthStrategiesRegistry } from "../../../authManager";

function logoutController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authStrategy =
        AuthStrategiesRegistry.instance.getStrategy(clientType);

      await authStrategy.logout(req.body);

      const response = new APIResBuilder()
        .setHttpCode(200)
        .setSuccess(true)
        .setMessage("Logout successful")
        .build();

      res.status(response.httpCode).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default logoutController;
