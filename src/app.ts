import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { checkOverLoad, countConnect } from "./helpers/check.connect";
import dotenv from "dotenv";
import routes from "./routes/index";

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

export default app;
