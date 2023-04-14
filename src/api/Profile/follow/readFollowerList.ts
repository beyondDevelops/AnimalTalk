import { accessInstance } from "../../axios";

export const readFollowerList = async (accountname: string, followerParam: number) => {
  const data = await accessInstance.get<any, any>(
    `/profile/${accountname}/follower?limit=10&skip=${(followerParam - 1) * 10}`
  );
  console.log(data);

  return data;
};
