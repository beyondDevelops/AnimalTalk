import axios from "axios";

const BASE_URL = "https://mandarin.api.weniv.co.kr";
const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosImgUpload = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getFollowersFeeds = async (feedParam = 1, options = {}) => {
  const res = await api.get(
    `/post/feed?limit=10&skip=${feedParam}`,
    {
      // headers를 api에 넣으면 기본적으로 모든 요청에 헤더가 붙는지 확인할 것
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
    options
  );
  return res.data.posts;
};

export const getSearchUser = async (search) => {
  const res = await api.get(`/user/searchuser/?keyword=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
