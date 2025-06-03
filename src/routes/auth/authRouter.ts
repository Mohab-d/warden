import { Router } from "express";
import refreshController from "./controllers/refreshController";
import signupController from "./controllers/signupController";
import loginController from "./controllers/loginController";
import validateBody from "../../middleware/validateBody";
import customerSignupSchema from "./schemas/joi/customerSignupSchema";
import customerLoginSchema from "./schemas/joi/customerLoginSchema";
import Joi from "joi";

const authRouter = Router();

authRouter.use(
  "/signup/customer",
  validateBody(customerSignupSchema.options({ abortEarly: false })),
  signupController("customer"),
);
authRouter.use(
  "/login/customer",
  validateBody(customerLoginSchema.options({ abortEarly: false })),
  loginController("customer"),
);
authRouter.use(
  "/refresh/customer",
  validateBody(Joi.object({ accessToken: Joi.string })),
  refreshController("customer"),
);

export default authRouter;
