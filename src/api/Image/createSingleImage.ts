import { imgInstance } from "../axios";

export const createSingleImage = async (file: File[]) => {
  const formData = new FormData();
  formData.append("image", file[0]);
  const res = await imgInstance.post<any, any>("/image/uploadfile", formData);
  return res.data.filename;
};
