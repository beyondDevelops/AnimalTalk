import { accessInstance } from "../axios";

export const readFollowingFeed = async (feedParam: number) => {
  const data = await accessInstance.get<any, any>(`/post/feed?limit=20&skip=${feedParam * 20}`);
  return data.posts;
};
