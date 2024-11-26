import { SuccessResponse } from "../middlewares/success.response";
import ProductFactory from "../services/product.service";

class ProductController {
  createProduct = async (req: any, res: any, next: any) => {
    new SuccessResponse({
      message: "Create new product successfully",
      statusCode: 200,
      reasonStatusCode: "OK",
      metadata: await ProductFactory.ProductFactory.createProduct(
        req.product_type,
        req.body
      ),
    }).send(res);
  };
}

export default new ProductController();
