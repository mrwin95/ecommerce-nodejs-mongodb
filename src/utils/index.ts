import _ from "lodash";
import crypto from "crypto";

export const getInfoData = ({
  fields = [],
  object = {},
}: {
  fields: Array<string>;
  object: Object;
}) => {
  return _.pick(object, fields);
};

export const getRandomBytes = (length: number = 64) => {
  const str = crypto.randomBytes(length).toString("hex");
  return str;
};
