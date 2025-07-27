import serverListener from "./controllers/serverListener";
import authApp from "./authApp";
import { appConfigs } from "../config/appConfigs";

// main loop
authApp.listen(appConfigs.port, (error: any) =>
  serverListener(appConfigs.port, error),
);
