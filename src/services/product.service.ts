import { product, clothing, electronics } from "../models/product.model";
import { ProductType } from "../types/product.type";

class ProductFactory {
  static async createProduct(type: String, payload: ProductType) {
    switch (type) {
      case "Clothing":
        return new Clothing(payload).createProduct();
      case "Electronics":
        return new Electronics(payload).createProduct();
      default:
        throw new Error("Invalid product type");
    }
  }
}
class Product {
  constructor(public product: ProductType) {}

  async createProduct() {
    return await product.create(this);
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product.product_attributes);
    if (!newClothing) throw new Error("Clothing creation failed");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new Error("Product creation failed");
    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronics = await electronics.create(
      this.product.product_attributes
    );
    if (!newElectronics) throw new Error("Electronics creation failed");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new Error("Product creation failed");
    return newProduct;
  }
}

export default { ProductFactory };
