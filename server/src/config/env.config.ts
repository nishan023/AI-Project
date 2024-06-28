import * as dotenv from "dotenv";
import Logger from "../lib/logger";
import path from "node:path";

const result = dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const isNotLoaded = result.error;

if (isNotLoaded) {
  Logger.error(`'.env' file could not be loaded : ${result.error}`);
  throw result.error;
}

const envConfig = {
  serverPort: process.env.SERVER_PORT,
  clientPort: process.env.CLIENT_PORT,
  mongo_Url: process.env.MONGO_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
};

export default envConfig;
