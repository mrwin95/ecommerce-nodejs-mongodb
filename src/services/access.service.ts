import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";

const roles = {
  SHOP: "SHOP",
  WRITER: "WRITER", // should be a number
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
};

class AccessService {
  signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      // 1. check email is already exist or not
      // 2. if not exist then create new user (the password should be hashed)
      // 3. if exist then return error message

      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: "400",
          message: "Email already exist",
          status: "error",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        hashedPassword,
        roles: [roles.SHOP],
      });

      if (newShop) {
      }
    } catch (error) {
      return {
        code: "500",
        message: "Internal Server Error",
        status: "error",
      };
    }
  };
}

export default AccessService;
