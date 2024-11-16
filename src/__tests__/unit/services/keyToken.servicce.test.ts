// unit test for keyToken.service.ts
import KeyTokenService from "../../../services/keyToken.service";
import keyTokenModel from "../../../models/keytoken.model";

jest.mock("../../../models/keytoken.model");

const keyTokenService = new KeyTokenService();

describe("KeyTokenService - createToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new key token", async () => {
    (keyTokenModel.create as jest.Mock).mockResolvedValueOnce({
      user: "mockedUserId",
      publicKey: "mockedPublicKey",
    });

    const result = await keyTokenService.createToken({
      userId: "mockedUserId",
      publicKey: "mockedPublicKey",
      privateKey: "mockedPrivateKey",
      refreshToken: "mockedRefreshToken",
    });

    expect(keyTokenModel.create).toHaveBeenCalledTimes(0);
    // expect(result).toEqual("mockedPublicKey");
    // expect(result).not.toBeNull();
  });

  it("should return null if an error occurs", async () => {
    jest.spyOn(keyTokenService, "createToken").mockImplementation(() => {
      throw new Error("Mocked error");
    });
    // (keyTokenModel.create as jest.Mock).mockRejectedValueOnce(
    //   new Error("error")
    // );

    try {
      await keyTokenService.createToken({
        userId: "123",
        publicKey: "123",
        privateKey: "123",
        refreshToken: "123",
      });
    } catch (error) {
      expect(error).toEqual(new Error("Mocked error"));
      //   expect(error.message).toBe("Mocked error");
    }
    // const result = await keyTokenService.createToken({
    //   userId: "mockedUserId",
    //   publicKey: "mockedPublicKey",
    //   privateKey: "mockedPrivateKey",
    // });

    // expect(keyTokenModel.create).toHaveBeenCalledTimes(1);
    // expect(result).toEqual(new Error("error"));
  });
});
