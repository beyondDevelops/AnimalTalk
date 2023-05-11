import axios from "axios";

export const convertURLtoFile = async (url: string) => {
  const res = await axios.get<any, any>(`https://mandarin.api.weniv.co.kr/${url}`, {
    responseType: "blob",
  });
  const extension = url.split(".").pop() as string;
  const filename = url.split("/").pop() as string;
  const metadata = { type: `image/${extension}` };
  const file = new File([res.data], filename, metadata);
  return file;
};
