import { NextFunction, Request, Response } from "express";
import authStrategiesRegistry from "../../../authManager/AuthStrategiesRegistry";
import APIResBuilder from "../../../builders/APIResBuilder";

async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const clientType = req.params.clientType;

    const authStrategy = authStrategiesRegistry.getStrategy(clientType);

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
}

export default loginController;
