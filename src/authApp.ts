import express, { json } from "express";
import errorHandler from "./controllers/errorHandler";
import morgan from "morgan";
import authRouter from "./routes/auth/authRouter";
import APIResBuilder from "./builders/APIResBuilder";

const authApp = express();

// middlewares
authApp.use(express.urlencoded({ extended: true }));
authApp.use(json());
authApp.use(morgan("dev"));

// routes
authApp.use("/auth", authRouter);

// error handling
authApp.use(errorHandler);

authApp.use((req, res) => {
  const notFoundRes = new APIResBuilder()
    .setSuccess(false)
    .setHttpCode(404)
    .setMessage("This route does not exist")
    .build();

  res.status(notFoundRes.httpCode).send(notFoundRes);
});

export default authApp;
