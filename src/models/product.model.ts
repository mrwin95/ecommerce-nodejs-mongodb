import exp from "constants";
import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumbnail: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing"],
    },
    product_shop: { type: Schema.Types.ObjectId, ref: "Shop" },
    product_attributes: { type: Schema.Types.Mixed, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

// define product type of clothing

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
  },
  {
    collection: "clothes",
    timestamps: true,
  }
);

// define product type of electronics

const electronicsSchema = new Schema(
  {
    brand: { type: String, required: true },
    color: { type: String, required: true },
    warranty: { type: String, required: true },
  },
  {
    collection: "electronics",
    timestamps: true,
  }
);

//Export the model

export const product = model(DOCUMENT_NAME, productSchema);
export const clothing = model("Clothing", clothingSchema);
export const electronics = model("Electronics", electronicsSchema);
