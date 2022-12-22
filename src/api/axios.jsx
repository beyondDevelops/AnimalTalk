import axios from "axios";

const BASE_URL = "https://mandarin.api.weniv.co.kr";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
