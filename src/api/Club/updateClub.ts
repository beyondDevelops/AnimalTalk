import { accessInstance } from "../axios";

interface IClub {
  itemName: string;
  price: number;
  link: string;
  itemImage: string[];
}

interface IData {
  product: IClub;
}

export const updateClub = async (submitData: IData, id: string) => {
  const data = await accessInstance.put<any, any>(`/product/${id}`, JSON.stringify(submitData));
  return data.product;
};
