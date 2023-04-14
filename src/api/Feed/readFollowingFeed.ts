import { accessInstance } from "../axios";

export const readFollowingFeed = async (feedParam: number) => {
  console.log(feedParam);

  const data = await accessInstance.get<any, any>(`/post/feed?limit=10&skip=${(feedParam - 1) * 10}`);
  return data.posts;
};
