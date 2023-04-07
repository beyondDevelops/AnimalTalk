import axios from "axios";

const BASE_URL = "https://mandarin.api.weniv.co.kr";

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

// Home
export const getFollowersFeeds = async (pageParam = 1, token, options = {}) => {
  const res = await api.get(
    `/post/feed?limit=10&skip=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    options
  );
  return res.data.posts;
};

// UserSearch
export const getSearchUser = async (search, token) => {
  const res = await api.get(`/user/searchuser/?keyword=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// UserFeed
export const getPageOwnerProfile = async (pageAccount, token) => {
  const res = await api.get(`/profile/${pageAccount}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.profile;
};

export const getPageOwnerFeeds = async (pageAccount, pageParam = 1, token, options = {}) => {
  const res = await api.get(
    `/post/${pageAccount}/userpost/?limit=10&skip=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    options
  );
  return res.data.post;
};

export const getPageOwnerClub = async (pageAccount, token) => {
  const res = await api.get(`/product/${pageAccount}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.product;
};
