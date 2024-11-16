import shopModel from "../models/shop.model";

export const findByEmail = async ({
  email,
  select = { email: 1, password: 2, name: 1, status: 1, roles: 1 }, // default select
}: {
  email: string;
  select: any;
}) => {
  const shopHolder = await shopModel.findOne({ email }).select(select).lean();
  return shopHolder;
};
