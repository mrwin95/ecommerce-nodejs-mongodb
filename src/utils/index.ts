import _ from "lodash";

export const getInfoData = ({
  fields = [],
  object = {},
}: {
  fields: Array<string>;
  object: Object;
}) => {
  return _.pick(object, fields);
};
