import { accessInstance } from "../axios";

export const readCommentList = async (id: string, commentParam: number) => {
  const data = await accessInstance.get<any, any>(`/post/${id}/comments/?limit=10&skip=${(commentParam - 1) * 10}`);
  return data.comments;
};
