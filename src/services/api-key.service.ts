import { log } from "console";
import apiKeyModel from "../models/api-key.model";
import crypto from "crypto";

export const findById = async (id: string) => {
  // example create a key in db
  //   const newKey = await apiKeyModel.create({
  //     key: crypto.randomBytes(64).toString("hex"),
  //     permissions: ["0000"],
  //   });

  //   log(newKey);
  const objKey = await apiKeyModel.findOne({ key: id, status: true }).lean();
  return objKey;
};
