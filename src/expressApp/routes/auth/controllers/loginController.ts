import { NextFunction, Request, Response } from "express";
import { APIResBuilder } from "../../../../apiResponseManager";
import { AuthStrategiesRegistry } from "../../../../authManager";

function loginController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authStrategy =
        AuthStrategiesRegistry.instance.getStrategy(clientType);

      const client = await authStrategy.login(req.body);

      const response = new APIResBuilder()
        .setHttpCode(200)
        .setSuccess(true)
        .setMessage("Login successful")
        .setAuthData({
          accessToken: client.accessToken,
          refreshToken: client.refreshToken,
        })
        .build();

      res.status(response.httpCode).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default loginController;
