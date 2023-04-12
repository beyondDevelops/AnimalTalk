import { accessInstance } from "../axios";

export const readMyFeed = async (pageAccount: string, feedParam: number) => {
  const data = await accessInstance.get<any, any>(`/post/${pageAccount}/userpost/?limit=20&skip=${feedParam * 20}`);
  return data.post;
};
