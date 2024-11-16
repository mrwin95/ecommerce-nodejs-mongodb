// Testing the function that fetches secrets from AWS Secrets Manager

import AWS, { SecretsManager } from "aws-sdk";
import { getSecret } from "../../../helpers/aws-sdk.helper";

// Mock the AWS SDK client

jest.mock("aws-sdk", () => {
  const mockedUpdate = jest.fn();

  const mockedSecretsManager = {
    getSecretValue: jest.fn().mockReturnThis(),
  };

  return {
    config: {
      update: mockedUpdate,
    },
    SecretsManager: jest.fn(() => mockedSecretsManager),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});
const mockedSecretsManager = new AWS.SecretsManager();

describe("AWS.config.update", () => {
  it("should update aws region configuration", () => {
    const region = "ap-southeast-1";
    AWS.config.update({ region });

    expect(AWS.config.update).toHaveBeenCalledTimes(2);
  });
});

describe("getSecret", () => {
  it("should fetch secret from AWS Secrets Manager", async () => {
    const secretName = "test";
    const mockedSecretValue = JSON.stringify({ value: "test" });

    (mockedSecretsManager.getSecretValue as jest.Mock).mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({
        SecretString: mockedSecretValue,
      }),
    });

    const secret = await getSecret(secretName);
    expect(secret).toEqual({ value: "test" });
  });
});
