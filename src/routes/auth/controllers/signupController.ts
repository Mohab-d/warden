import { NextFunction, Request, Response } from "express";
import APIResBuilder from "../../../builders/APIResBuilder";
import authStrategiesRegistry from "../../../authManager/AuthStrategiesRegistry";

async function signupController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // check client type
    const clientType = req.params.clientType;

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
}

export default signupController;
