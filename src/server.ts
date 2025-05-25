import express, { json } from "express";
import serverListener from "./controllers/serverListener";
import errorHandler from "./controllers/errorHandler";
import { appConfigs } from "./config/appConfigs";
import morgan from "morgan";
import authRouter from "./routes/auth/authRouter";

const authApp = express();

// middlewares
authApp.use(express.urlencoded({ extended: true }));
authApp.use(json());
authApp.use(morgan("dev"));

// routes
authApp.use("/auth", authRouter);

// error handling
authApp.use(errorHandler);

// main loop
authApp.listen(appConfigs.port, (error) =>
  serverListener(appConfigs.port, error),
);
