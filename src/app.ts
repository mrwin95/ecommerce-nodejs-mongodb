import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { checkOverLoad, countConnect } from "./helpers/check.connect";
import dotenv from "dotenv";
import routes from "./routes/index";
import HttpError from "./helpers/error.helper";
dotenv.config();
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init dbs
import "./dbs/init.mongodb";
// countConnect(); // open it to see the number of connections
checkOverLoad();
// Routes
app.use("/", routes);
// Error handling

app.use((req, res, next) => {
  const error = new HttpError(404, "Not found");
  next(error);
});

app.use((error: HttpError, req: any, res: any, next: any) => {
  const statusCode = error.status || 500;
  return res
    .status(statusCode)
    .json({ status: "error", code: error.status, message: error.message });
});

export default app;
