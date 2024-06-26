import envConfig from "../config/env.config";
import mongoose from "mongoose";
import Logger from "../lib/logger";

class Database {
  private static _database: Database;
  private constructor() {
    const db_url = envConfig.mongo_Url as string;
    if (db_url) {
      mongoose
        .connect(db_url)
        .then(() => {
          Logger.http("Initialized db connection");
        })
        .catch((err) => {
          Logger.error(`Database connection error: ${err}`);
        });
    }
  }

  public static async getInstance() {
    if (this._database) {
      return this._database;
    }
    this._database = new Database();
    return (this._database = new Database());
  }
}

export default Database;
