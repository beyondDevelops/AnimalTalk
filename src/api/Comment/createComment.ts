import { accessInstance } from "../axios";

type commentReq = {
  content: string;
};

export const createCommentList = async (id: string, text: string) => {
  if (!text) {
    throw new Error("Text is empty");
  }
  const data = await accessInstance.post<any, commentReq>(`/post/${id}/comments`, {
    content: text,
  });
  return data;
};
