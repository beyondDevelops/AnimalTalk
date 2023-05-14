import { accessInstance } from "../axios";

export const readClubList = async (accountname: string, clubParam: number) => {
  const data = await accessInstance.get<any, any>(`/product/${accountname}/?limit=3&skip=${(clubParam - 1) * 3}`);
  return data.product;
};
