import { accessInstance } from "../axios";

export const readClubDetail = async (id: string) => {
  const data = await accessInstance.get<any, any>(`/product/detail/${id}`);
  return data.product;
};
