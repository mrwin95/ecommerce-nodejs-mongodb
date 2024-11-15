import { log } from "console";
import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect";
import config from "../configs/mongodb.config";

const connectString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // Connect to MongoDB

    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => log("Connected to MongoDB", countConnect()))
      .catch((err) => log(`Error connect ${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
