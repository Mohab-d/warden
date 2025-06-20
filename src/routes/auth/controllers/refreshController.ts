import { NextFunction, Request, Response } from "express";
import authStrategiesRegistry from "../../../registries/AuthStrategiesRegistry";
import APIResBuilder from "../../../builders/APIResBuilder";

function refreshController(
  clientType: string,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.body.refreshToken;

      const authStrategy = authStrategiesRegistry.getStrategy(clientType);

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
