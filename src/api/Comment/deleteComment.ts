import { accessInstance } from "../axios";

export const deleteComment = async (id: string, commentId: string) => {
  const data = await accessInstance.post<any, any>(`/post/${id}/comments/${commentId}/report`, {});
  return data;
};
