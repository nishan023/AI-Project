import express from "express";
import startingSchema from "./connection/db.connection";
import * as dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, ".env") });
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


const startServer = async () => {
  try {
    await startingSchema(process.env.MONGO_URL)
      .then(() => {
        console.log("Connected To MongoDB Database SuccessFully ...");
      })
      .catch((err: any) => {
        console.log("MongoDB connection failed");
      });
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();

export default app;
