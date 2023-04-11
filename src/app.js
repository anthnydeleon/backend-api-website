import dotenv from "dotenv";
import express from "express";
import { resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import delay from "express-delay";

import "./database";

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import photoRoutes from "./routes/photoRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();

const whiteList = [
  "http://localhost:3000",
  "https://frontend-website.up.railway.app",
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido pelo CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(delay(1000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/photos", photoRoutes);
    this.app.use("/messages", messageRoutes);
  }
}

export default new App().app;
