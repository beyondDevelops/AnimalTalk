import { accessInstance } from "../axios";

export const readSearch = async (search: string) => {
  const data = await accessInstance.get<any, any>(`/user/searchuser/?keyword=${search}`);
  return data;
};
