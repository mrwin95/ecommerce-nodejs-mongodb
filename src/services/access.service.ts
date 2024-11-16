import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";

import createTokenPair from "../auth/auth-utils";
import KeyTokenService from "./keyToken.service";
import { getInfoData, getRandomBytes } from "../utils";
import { BadRequest, NotFound } from "../middlewares/error.response";
import { findByEmail } from "./shop.service";
import { log } from "console";

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

  /**
   *  1. check email is already exist or not
   * 2. if not exist then create new user (the password should be hashed)
   * 3. if exist then return error message
   * 4. create accessToken
   * 5. create refreshToken
   * 6. save refreshToken in the database
   * 7. return accessToken and refreshToken
   *
   * @param param0
   */
  login = async ({
    email,
    password,
    refreshToken = null,
  }: {
    email: string;
    password: string;
    refreshToken: string | null;
  }) => {
    const foundShop = await findByEmail({ email, select: {} });
    if (!foundShop) {
      throw new NotFound("User not found", 404);
    }

    const isPasswordMatch = await bcrypt.compare(password, foundShop.password);
    if (!isPasswordMatch) {
      throw new BadRequest("Password does not match", 400);
    }

    // create a token pair
    const privateKey = getRandomBytes();
    const publicKey = getRandomBytes();

    const tokens = await createTokenPair.createTokenPair(
      {
        userId: foundShop._id,
        email,
      },
      publicKey,
      privateKey
    );

    log("tokens", tokens.refreshToken);
    await this.keyTokenService.createToken({
      refreshToken: tokens.refreshToken,
      privateKey: privateKey,
      publicKey: publicKey,
      userId: foundShop._id,
    });
    return {
      shop: getInfoData({
        fields: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    // try {
    // 1. check email is already exist or not
    // 2. if not exist then create new user (the password should be hashed)
    // 3. if exist then return error message

    const shopHolder = await shopModel.findOne({ email }).lean();
    if (shopHolder) {
      throw new BadRequest("Email already exist", 400);
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

      // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "spki",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs8",
      //     format: "pem",
      //   },
      // }); // this is used for big system

      const privateKey = getRandomBytes();
      const publicKey = getRandomBytes();

      const keyStore = await this.keyTokenService.createToken({
        userId: newShop._id,
        publicKey,
        privateKey,
        refreshToken: "",
      });

      if (!keyStore) {
        return {
          code: "400",
          message: "keyStore not created",
          status: "error",
        };
      }

      // create a token pair

      const tokens = await createTokenPair.createTokenPair(
        {
          userId: newShop._id,
          email,
        },
        publicKey,
        privateKey
      );

      return {
        code: "201",
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      code: "201",
      metadata: null,
    };
  };
}

export default AccessService;
