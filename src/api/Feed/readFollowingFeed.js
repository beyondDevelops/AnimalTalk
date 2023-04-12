import { accessInstance } from "../axios";

export const readFollowingFeed = async (feedParam) => {
  const data = await accessInstance.get(`/post/feed?limit=10&skip=${feedParam * 10}`);
  return data.posts;
};
