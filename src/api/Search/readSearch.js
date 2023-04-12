import { accessInstance } from "../axios";

export const readSearch = async (search) => {
  const data = await accessInstance.get(`/user/searchuser/?keyword=${search}`);
  return data;
};
