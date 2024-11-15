// Testing access service
import AccessService from "../../../services/access.service";
import shopModel from "../../../models/shop.model";
import bcrypt from "bcrypt";
import KeyTokenService from "../../../services/keyToken.service";

jest.mock("bcrypt");
jest.mock("crypto");

jest.mock("../../../models/shop.model");
jest.mock("../../../services/keyToken.service");
jest.mock("../../../utils/index.ts");

// const keyTokenService = new KeyTokenService();
// const accessService = new AccessService(keyTokenService);

describe("AccessService - Signup", () => {
  let keyTokenService: KeyTokenService;
  let accessService: AccessService;

  beforeEach(() => {
    keyTokenService = new KeyTokenService();
    accessService = new AccessService(keyTokenService);
    jest.clearAllMocks();
  });

  it("should throw BadRequest if email already exists", async () => {
    (shopModel.findOne as jest.Mock).mockReturnValueOnce({
      lean: jest.fn().mockResolvedValueOnce({ email: "mockedEmail" }),
    });

    const signPayload = {
      name: "mockedName",
      email: "mockedEmail",
      password: "mockedPassword",
    };

    await expect(accessService.signUp(signPayload)).rejects.toThrow(
      "Email already exist"
    );

    // try {
    //   await accessService.signUp({
    //     name: "mockedName",
    //     email: "mockedEmail",
    //     password: "mockedPassword",
    //   });
    // } catch (error) {
    //   expect(error.message).toBe("Email already exist");
    //   expect(error.status).toBe(400);
    // }
  });

  //   it("should create a new shop when email does not exist", async () => {

  //     (shopModel.findOne as jest.Mock).mockReturnValue({
  //       lean: jest.fn().mockResolvedValue(null),
  //     });
  //     (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

  //     (shopModel.create as jest.Mock).mockResolvedValue({
  //       name: "mockedName",
  //       email: "mockedEmail",
  //       password: "hashedPassword",
  //     });

  //     const result = await accessService.signUp({
  //       name: "mockedName",
  //       email: "mockedEmail",
  //       password: "mockedPassword",
  //     });

  //     expect(shopModel.findOne).toHaveBeenCalledTimes(1);
  //     expect(shopModel.create).toHaveBeenCalledTimes(1);

  //     // expect(result).toEqual({
  //     //   name: "mockedName",
  //     //   email: "mockedEmail",
  //     // });
  //   });
});
