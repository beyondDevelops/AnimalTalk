import { accessInstance } from "../axios";

export const readClubList = async (pageAccount) => {
  const data = await accessInstance.get(`/product/${pageAccount}`);
  return data.product;
};
