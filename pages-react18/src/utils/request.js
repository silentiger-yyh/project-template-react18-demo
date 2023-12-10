import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000,
});

// 全局请求拦截，参考https://github.com/axios/axios?tab=readme-ov-file#interceptors
// 发送请求之前执行
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["authorization"] = "uuY" + getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截，参考https://github.com/axios/axios?tab=readme-ov-file#interceptors
// 请求返回之后执行
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params url传参
 * @returns
 */
export function get(url, params) {
  return axios.get(url, {
    params,
  });
}

/**
 * post请求
 * @param {*} url 请求地址
 * @param {*} data 参数
 * @returns
 */
export function post(url, data) {
  return axios.post(url, data);
}

/**
 * put请求
 * @param {*} url url地址
 * @param {*} data 数据
 * @returns
 */
export function put(url, data) {
  return axios.put(url, data);
}

/**
 * delete请求
 * @param {*} url 请求地址
 * @returns
 */
export function del(url) {
  return axios.del(url);
}
