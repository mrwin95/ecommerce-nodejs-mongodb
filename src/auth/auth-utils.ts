import { log } from "console";
import Jwt from "jsonwebtoken";

const createTokenPair = async (
  payload: {},
  publicKey: string,
  privateKey: string
): Promise<object | any> => {
  try {
    // access Token
    const accessToken = await Jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    // refresh Token
    const refreshToken = await Jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // log(accessToken, refreshToken);
    // verify

    Jwt.verify(accessToken, publicKey, (err, decoded) => {
      if (err) {
        console.error("verify error", err);
      } else {
        console.log("decoded", decoded);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

export default { createTokenPair };
