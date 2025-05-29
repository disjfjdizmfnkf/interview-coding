// 从localStorage中获取token
function getToken() {
  return localStorage.getItem("token");
}

// 将token保存到localStorage中
function setToken(token) {
  localStorage.setItem("token", token);
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function setRefreshToken(token) {
  localStorage.setItem("refreshToken", token);
}

export { getToken, setToken, setRefreshToken, getRefreshToken };
