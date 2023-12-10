import { post } from "../utils/request";

/**
 * 用户登录
 * @param {*} user 用户登录信息
 * @returns
 * username
 * password
 */
export function loginApi(user) {
  return post("/api/v1/auth/manager_login", user);
}
