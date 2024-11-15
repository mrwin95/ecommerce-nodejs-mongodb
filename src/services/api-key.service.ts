import apiKeyModel from "../models/api-key.model";

export const findById = async (id: string) => {
  const objKey = await apiKeyModel.findOne({ key: id, status: true }).lean();
  return objKey;
};
