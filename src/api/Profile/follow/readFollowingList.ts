import { accessInstance } from "../../axios";

export const readFollowingList = async (accountname: string, followingParam: number) => {
  // const data = await accessInstance.get<any, any>(`/profile/${accountname}/following?limit=${Infinity}`);
  const data = await accessInstance.get<any, any>(
    `/profile/${accountname}/following?limit=10&skip=${(followingParam - 1) * 10}`
  );
  console.log(data);
  return data;
};
