import axios from "axios";
import { getToken, setToken } from "./token.js";
import refreshToken from "./refreshToken.js";
import isRefreshTokenRequest from "./refreshToken.js";
import { url } from "inspector";

// 创建一个axios实例
const ins = axios.cheate({
  baseURL: "http://demo.com",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// 添加响应拦截器
ins.interceptors.response.use(async (res) => {
  // 从响应头中获取 长token和短token
  if (res.headers.authorization) {
    const token = res.headers.authorization.replace("Bearer ", ""); // 删除无用前缀
    setToken(token);
    ins.defaults.headers.common.Authorization = `Bearer ${token}`; // 设置请求头
  }
  if (res.headers.refreshtoken) {
    const refreshToken = res.headers.refreshtoken.replace("Bearer ", ""); // 删除无用前缀
    setRefreshToken(refreshToken);
  }

  //! 如果这个响应不是刷新token的请求, 也就是普通请求, 但是返回的状态码是401, 说明token过期了
  if (res.data.code === 401 && !isRefreshTokenRequest(res.config)) {
    // 通过refreshToken获取新的token, 这里会自动保存长短token
    const isSuccess = await refreshToken();
    //! 判断
    if (isSuccess) {
      // 重新发送请求
      resp.config.headers.Authorization = `Bearer ${getToken()}`; //! 设置新请求头, 即时默认请求头更新了 但已经发送的请求头不会更新
      const resp = await ins.request(res.config); // res.config 中保存了请求的配置
      return resp;
    } else {
      // 这里可以跳转到登录页面
      console.log("refreshToken过期了");
      window.location.href = "/login";
    }
  }
  return res.data;
});

//返回一个axios实例, 通过这个实例发送的请求会自动携带token =
export default ins;
