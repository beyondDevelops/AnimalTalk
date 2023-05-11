import { accessInstance } from "../axios";

export const readMyFeed = async (pageAccount: string, feedParam: number) => {
  const data = await accessInstance.get<any, any>(
    `/post/${pageAccount}/userpost/?limit=10&skip=${(feedParam - 1) * 10}`
  );
  return data.post;
};
