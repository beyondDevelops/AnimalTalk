import { accessInstance } from "../axios";

export const readProfile = async (pageAccount) => {
  const data = await accessInstance.get(`/profile/${pageAccount}`);
  return data.profile;
};
