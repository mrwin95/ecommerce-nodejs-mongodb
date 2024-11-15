import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import { log } from "console";
import crypto from "crypto";
import keyTokenService from "./keyToken.service";
import createTokenPair from "../auth/auth-utils";
import KeyTokenService from "./keyToken.service";
const roles = {
  SHOP: "SHOP",
  WRITER: "WRITER", // should be a number
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
};

class AccessService {
  constructor(public keyTokenService: KeyTokenService) {
    this.keyTokenService = keyTokenService;
  }

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
        password: hashedPassword,
        roles: [roles.SHOP],
      });

      if (newShop) {
        //1. create private key and public key
        //2. save private key in the database
        //3. send public key to the user
        //4. return error message

        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        });

        // const publicKeyStringReturn = publicKey
        //   .export({
        //     type: "spki",
        //     format: "pem",
        //   })
        //   .toString("base64");
        // const privateKeyStringReturn = privateKey
        //   .export({
        //     type: "spki",
        //     format: "pem",
        //   })
        //   .toString("base64");

        log({ publicKey, privateKey });

        const publicKeyString = await this.keyTokenService.createToken({
          userId: newShop._id,
          publicKey: publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "400",
            message: "publicKeyString not created",
            status: "error",
          };
        }

        // create a token pair

        const tokens = await createTokenPair.createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKeyString,
          privateKey
        );

        log("crate token pair", tokens);

        return {
          code: "201",
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }

      return {
        code: "201",
        metadata: null,
      };
    } catch (error: any) {
      return {
        code: "500",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default AccessService;
