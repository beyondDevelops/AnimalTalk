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

export const createClub = async (submitData: IData) => {
  const data = await accessInstance.post<any, any>("/product", JSON.stringify(submitData));
  return data.product;
};
