import {initConfig} from "./config/config";
import {startServer} from "./app";

initConfig();

(async () => {
  await startServer();
})();
