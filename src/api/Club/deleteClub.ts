import { accessInstance } from "../axios";

export const deleteClub = async (id: string) => {
  const data = await accessInstance.delete<any, any>(`/product/${id}`);
  return data.product;
};
