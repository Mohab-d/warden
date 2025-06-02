import { Router } from "express";
import refreshController from "./controllers/refreshController";
import signupController from "./controllers/signupController";
import loginController from "./controllers/loginController";
import validateBody from "../../middleware/validateBody";
import customerSignupSchema from "./schemas/joi/customerSignupSchema";

const authRouter = Router();

authRouter.use(
  "/signup/customer",
  validateBody(customerSignupSchema.options({ abortEarly: false })),
  signupController("customer"),
);
authRouter.use("/login/customer", loginController("customer"));
authRouter.use("/refresh/customer", refreshController("customer"));

export default authRouter;
