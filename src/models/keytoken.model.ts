import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "Shop" },
    publicKey: { type: String, required: true, trim: true },
    privateKey: { type: String, required: true, trim: true },
    refreshToken: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, keyTokenSchema);
