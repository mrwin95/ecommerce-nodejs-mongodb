"use strict";

import { log } from "console";
import mongoose from "mongoose";
import os from "os";

const _INTERVAL_MS = 10000;
export const countConnect = () => {
  const numberConnection = mongoose.connections.length;
  log(`Number of connections: ${numberConnection}`);
  return numberConnection;
};

export const checkOverLoad = () => {
  setInterval(() => {
    const numberConnection = mongoose.connections.length;
    const numberOfCores = os.cpus().length;
    const memoryUsageMB = (os.totalmem() - os.freemem()) / (1024 * 1024 * 1000);
    const maxConnection = numberOfCores * 5;

    log(`Number of connections: ${numberConnection}`);
    log(`Number of cores: ${numberOfCores}`);
    log(`Memory usage: ${memoryUsageMB.toFixed(2)} MB`);

    if (numberConnection > maxConnection) {
      log("Overload connections");
      // TODO: Add notification logic here
    }
  }, _INTERVAL_MS);
};
