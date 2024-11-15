import keyTokenModel from "../models/keytoken.model";

class KeyTokenService {
  createToken = async ({
    userId,
    publicKey,
  }: {
    userId: any;
    publicKey: string;
  }): Promise<string | null> => {
    try {
      const publicKeyString = publicKey.toString();
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return token ? token.publicKey : null;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default KeyTokenService;
