import request from "request";
import { getRefreshToken } from "./token.js";

let promise; //! 创建全局变量防止并发请求都去申请刷新token

// 通过refreshToken获取新的token
export function refreshToken() {
  if (promise) return promise;

  return new Promise(async (resolve) => {
    console.log("刷新token");
    // 通过实例自动保存长短token
    const resp = await request.get("/refreshToken", {
      // 使用长token获取短token
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
      // 标识这个请求是为了刷新token
      __isRefreshToken: true,
    });
    resolve(resp.code === 0); //! 如果refreshToken过期, 假设状态码为0
  }).finally(() => {
    promise = null;
  });
}

// 判断是否是刷新token的请求
export function isRefreshTokenRequest(config) {
  return !!config.__isRefreshToken;
}
