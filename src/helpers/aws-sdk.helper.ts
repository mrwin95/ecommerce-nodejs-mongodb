import AWS from "aws-sdk";
// set region

AWS.config.update({
  region: process.env.AWS_REGION,
});

const secretManager = new AWS.SecretsManager();

const getSecret = async (secretName: string): Promise<string> => {
  try {
    const data = await secretManager
      .getSecretValue({ SecretId: secretName })
      .promise();

    if (data.SecretString) {
      const secret = JSON.parse(data.SecretString);
      return secret;
    } else {
      // Secret is binary
      const buff = Buffer.from(data.SecretBinary as string, "base64");
      const decodedBinarySecret = buff.toString("ascii");
      return decodedBinarySecret;
    }
  } catch (error) {
    console.error("Error fetching secret", error);
    throw error;
  }

  //   return new Promise((rs, rj) => {
  //     secretManager.getSecretValue({ SecretId: secretName }, (err, data) => {
  //       if (err) {
  //         rj(err);
  //       } else {
  //         if (data !== null && data.SecretString !== undefined) {
  //           rs(data.SecretString);
  //         }
  //       }
  //     });
  //   });
};

export { getSecret };
