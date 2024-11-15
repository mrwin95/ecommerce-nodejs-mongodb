import { NextFunction, Request, Response } from "express";
import { findById } from "../services/api-key.service";
import { log } from "console";
const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req: any, res: any, next: any) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // check key in db
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

const checkPermission = (permission: string) => {
  return (req: any, res: any, next: any) => {
    const permissionArrays = new Array(req.objKey.permissions);
    if (permissionArrays.length === 0) {
      return res.status(403).json({ message: "Permission denied" });
    }

    log(permissionArrays);

    const validPermission = permissionArrays.toString().includes(permission);
    if (!validPermission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    return next();
  };
};

export default { apiKey, checkPermission };
