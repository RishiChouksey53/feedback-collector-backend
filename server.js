import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import mainRouter from "./routes/main.router.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://feedback-collector-frontend-swart.vercel.app" }));
app.use("/", mainRouter);

app.set("port", process.env.PORT || 8080);

const start = async () => {
  try {
    // Connect to MongoDB
    const connectDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB host ${connectDb.connection.host}`);

    // start the server
    app.listen(app.get("port"), () => {
      console.log(`Server listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

start();
