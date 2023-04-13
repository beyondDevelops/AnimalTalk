import { accessInstance } from "../axios";

export const readFollowingFeed = async (feedParam: number) => {
  console.log(feedParam);

  const data = await accessInstance.get<any, any>(`/post/feed?limit=20&skip=${feedParam * 10}`);
  return data.posts;
};
