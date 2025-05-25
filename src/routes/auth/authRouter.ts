import { Router } from "express";
import signupRoute from "./branchedRoutes/signupRoute";
import loginRoute from "./branchedRoutes/loginRoute";
import refreshController from "./controllers/refreshController";

const authRouter = Router();

authRouter.use("/signup", signupRoute);
authRouter.use("/login", loginRoute);
authRouter.post("/refresh/:clientType", refreshController);

export default authRouter;
