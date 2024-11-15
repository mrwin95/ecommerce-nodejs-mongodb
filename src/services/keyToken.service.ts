import keyTokenModel from "../models/keytoken.model";

class KeyTokenService {
  createToken = async ({
    userId,
    publicKey,
    privateKey,
  }: {
    userId: any;
    publicKey: string;
    privateKey: string;
  }): Promise<string | null> => {
    try {
      const token = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return token ? token.publicKey : null;
    } catch (error) {
      throw new Error(String(error));
    }
  };
}

export default KeyTokenService;
