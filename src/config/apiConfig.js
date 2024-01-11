import axios from "axios";
const env = process.env;
const config = {
  BASE_URL: "http://localhost:8080",
};

const fetchAPI = () => {
  const defaultOption = {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      authorization: "Bearer "+ JSON.parse(localStorage.getItem("userData")),
    },
  };
  let instances = axios.create({ ...defaultOption });
  return instances;
};

export const apiClient = {
  get(path) {
    return fetchAPI().get(`${config.BASE_URL}${path}`);
  },
  post(path, params) {
    return fetchAPI().post(`${config.BASE_URL}${path}`, params);
  },
  put(path, params) {
    return fetchAPI().put(`${config.BASE_URL}${path}`, params);
  },
  delete(path,params){
    return fetchAPI().delete(`${config.BASE_URL}${path}`, params)
  }
};
