import { Router } from "express";
import logincontoller from "../controllers/loginController";

const loginRoute = Router();

loginRoute.post("/:clientType", logincontoller);

export default loginRoute;
