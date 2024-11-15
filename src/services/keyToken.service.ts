import keyTokenModel from "../models/keytoken.model";

class KeyTokenService {
  createToken = async ({
    userId,
    publicKey,
  }: {
    userId: any;
    publicKey: string;
  }) => {
    try {
      const publicKeyString = publicKey.toString();
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return token ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
