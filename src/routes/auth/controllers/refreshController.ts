import { NextFunction, Request, Response } from "express";
import authStrategiesRegistry from "../../../authManager/AuthStrategiesRegistry";
import APIResBuilder from "../../../builders/APIResBuilder";

function refreshController(req: Request, res: Response, next: NextFunction) {
  try {
    const clientType = req.params.clientType;
    const refreshToken = req.body.refreshToken;

    const authStrategy = authStrategiesRegistry.getStrategy(clientType);

    const refreshData = authStrategy.refresh(refreshToken);

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
}

export default refreshController;
