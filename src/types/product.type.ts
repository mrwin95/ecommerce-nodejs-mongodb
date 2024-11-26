import { Schema } from "mongoose";

export type ProductType = {
  product_name: String;
  product_thumbnail: String;
  product_description: String;
  product_price: Number;
  product_quantity: Number;
  product_type: String;
  product_shop: String;
  product_attributes: Schema.Types.Mixed;
};
