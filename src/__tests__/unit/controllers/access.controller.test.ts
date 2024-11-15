import request from "supertest";
import express, { Application } from "express";

import accessController from "../../../controllers/access.controller";
import AccessService from "../../../services/access.service";
import KeyTokenService from "../../../services/keyToken.service";

jest.mock("../../../controllers/access.controller");
jest.mock("../../../services/access.service");
jest.mock("../../../services/keyToken.service");

describe("AccessController", () => {
  let app: Application;
  let mockAccessService: jest.Mocked<AccessService>;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post("/signup", accessController.signUp);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    const mockKeyTokenService = new KeyTokenService();
    mockAccessService = new AccessService(
      mockKeyTokenService
    ) as jest.Mocked<AccessService>;

    (AccessService as jest.Mock).mockImplementation(() => mockAccessService);
  });

  it("should return 201 and a success response for valid sign-up", async () => {
    // TODO: Implement the test
  });

  //   it("should return 201 and a success response for valid sign-up", async () => {
  //     // const mockKeyTokenService = new KeyTokenService();
  //     // const mockAccessService = new AccessService(mockKeyTokenService);

  //     // mock request body

  //     const requestBody = {
  //       name: "name",
  //       email: "test@example.com",
  //       password: "password",
  //     };

  //     const response = await request(app)
  //       .post("/signup")
  //       .send(requestBody)
  //       .expect(201);

  //     expect(response.status).toBe(201);
  //   });
});
