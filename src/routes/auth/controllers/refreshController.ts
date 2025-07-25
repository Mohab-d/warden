import { NextFunction, Request, Response } from "express";
import APIResBuilder from "../../../builders/APIResBuilder";
import { AuthStrategiesRegistry } from "../../../authManager";

function refreshController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.body.refreshToken;

      const authStrategy =
        AuthStrategiesRegistry.instance.getStrategy(clientType);

      const refreshData = await authStrategy.refresh(refreshToken);

      const response = new APIResBuilder()
        .setHttpCode(200)
        .setSuccess(true)
        .setMessage("Token refreshed successful")
        .setAuthData({
          accessToken: refreshData.accessToken,
        })
        .build();

      res.status(response.httpCode).send(response);
    } catch (error) {
      next(error);
    }
  };
}

export default refreshController;
