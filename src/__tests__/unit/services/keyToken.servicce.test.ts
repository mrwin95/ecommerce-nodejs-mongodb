// unit test for keyToken.service.ts
import KeyTokenService from "../../../services/keyToken.service";
import keyTokenModel from "../../../models/keytoken.model";
import e from "express";

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
    });

    expect(keyTokenModel.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual("mockedPublicKey");
    expect(result).not.toBeNull();
  });

  it("should return null if an error occurs", async () => {
    (keyTokenModel.create as jest.Mock).mockRejectedValueOnce(
      new Error("error")
    );

    const result = await keyTokenService.createToken({
      userId: "mockedUserId",
      publicKey: "mockedPublicKey",
    });

    expect(keyTokenModel.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new Error("error"));
  });
});
