import axios from "axios";

const BASE_URL = "https://mandarin.api.weniv.co.kr";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const imgInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const accessInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

accessInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers?.Authorization) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log(error.messages);
    return Promise.reject(error);
  }
);

accessInstance.interceptors.response.use(
  (res) => {
    if (!res.status) {
      throw new Error("Response status is not 200");
    }
    return res.data;
  },
  (error) => {
    console.log(error.messages);
    return Promise.reject(error);
  }
);
