import App from "./server";
import envConfig from "./config/env.config";
import express from "express";

const serverPort = envConfig.serverPort;
const app = new App(serverPort);
export const application = express();
app.listen();
