import { Router } from "express";
import refreshController from "./controllers/refreshController";
import signupController from "./controllers/signupController";
import loginController from "./controllers/loginController";
import validateBody from "../../middleware/validateBody";
import customerSignupSchema from "./schemas/joi/customerSignupSchema";
import customerLoginSchema from "./schemas/joi/customerLoginSchema";
import Joi from "joi";
import logoutController from "./controllers/logoutController";
import thirdPartyAppSignupSchema from "./schemas/joi/thirdPartyAppSignupSchema";

const authRouter = Router();

// singup
authRouter.use(
  "/signup/customer",
  validateBody(customerSignupSchema.options({ abortEarly: false })),
  signupController("customer"),
);
authRouter.use(
  "/signup/third-party-app",
  validateBody(thirdPartyAppSignupSchema.options({ abortEarly: false })),
  signupController("third-party-app"),
);

// login
authRouter.use(
  "/login/customer",
  validateBody(customerLoginSchema.options({ abortEarly: false })),
  loginController("customer"),
);

// logout
authRouter.use(
  "/logout/customer",
  validateBody(Joi.object({ accessToken: Joi.string().required() })),
  logoutController("customer"),
);
authRouter.use(
  "/logout/third-party-app",
  validateBody(Joi.object({ apiKey: Joi.string().required() })),
  logoutController("third-party-app"),
);

// refresh
authRouter.use(
  "/refresh/customer",
  validateBody(Joi.object({ refreshToken: Joi.string().required() })),
  refreshController("customer"),
);

export default authRouter;
