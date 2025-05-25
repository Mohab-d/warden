import { Router } from "express";
import signupController from "../controllers/signupController";

const signupRoute = Router();

signupRoute.post("/:clientType", signupController);

export default signupRoute;
