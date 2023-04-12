import { accessInstance } from "../axios";

export const readMyFeed = async (pageAccount, feedParam) => {
  const data = await accessInstance.get(`/post/${pageAccount}/userpost/?limit=10&skip=${feedParam * 10}`);
  return data.post;
};
