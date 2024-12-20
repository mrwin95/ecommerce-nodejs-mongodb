import { filter } from "lodash";
import keyTokenModel from "../models/keytoken.model";

class KeyTokenService {
  createToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: {
    userId: any;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
  }): Promise<string | null> => {
    try {
      //   const token = await keyTokenModel.create({
      //     user: userId,
      //     publicKey,
      //     privateKey,
      //   });

      //   return token ? token.publicKey : null;

      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const token = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return token ? token.publicKey : null;
    } catch (error) {
      throw new Error(String(error));
    }
  };
}

export default KeyTokenService;
