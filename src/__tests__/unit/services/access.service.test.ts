// Testing access service
import AccessService from "../../../services/access.service";
import shopModel from "../../../models/shop.model";
import bcrypt from "bcrypt";
import KeyTokenService from "../../../services/keyToken.service";

jest.mock("../../../models/shop.model");
jest.mock("../../../services/keyToken.service");
jest.mock("bcrypt");

const mockKeyTokenService = new KeyTokenService();
const accessService = new AccessService(mockKeyTokenService);

describe("AccessService - Signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new shop when email does not exist", async () => {
    (shopModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

    (shopModel.create as jest.Mock).mockResolvedValue({
      name: "mockedName",
      email: "mockedEmail",
      password: "hashedPassword",
    });

    const result = await accessService.signUp({
      name: "mockedName",
      email: "mockedEmail",
      password: "mockedPassword",
    });

    expect(shopModel.findOne).toHaveBeenCalledTimes(1);
    expect(shopModel.create).toHaveBeenCalledTimes(1);

    // expect(result).toEqual({
    //   name: "mockedName",
    //   email: "mockedEmail",
    // });
  });
});
