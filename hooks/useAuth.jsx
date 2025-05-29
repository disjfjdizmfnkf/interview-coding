import { useState, useEffect } from "react";

// 定义 useAuth Hook
const useAuth = () => {
  // 初始化用户状态
  const [user, setUser] = useState(null);

  // 在组件挂载时检查本地存储中的用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 登录方法
  const login = (userData) => {
    // 将用户信息存储到本地存储
    localStorage.setItem("user", JSON.stringify(userData));
    // 更新用户状态
    setUser(userData);
  };

  // 注销方法
  const logout = () => {
    // 从本地存储中移除用户信息
    localStorage.removeItem("user");
    // 更新用户状态为 null
    setUser(null);
  };

  // 返回用户状态和login logout方法
  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
