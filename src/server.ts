import serverListener from "./controllers/serverListener";
import { appConfigs } from "./config/appConfigs";
import authApp from "./authApp";

// main loop
authApp.listen(appConfigs.port, (error: any) =>
  serverListener(appConfigs.port, error),
);
