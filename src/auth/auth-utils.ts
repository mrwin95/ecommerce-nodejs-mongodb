import Jwt from "jsonwebtoken";

const createTokenPair = async (
  payload: {},
  publicKey: string,
  privateKey: string
) => {
  try {
    // access Token
    const accessToken = await Jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    // refresh Token
    const refreshToken = await Jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

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
