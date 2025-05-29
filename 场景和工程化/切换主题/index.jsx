// ThemeProviderWrapper.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  // 从 localStorage 获取用户之前的主题设置
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [currentTheme, setCurrentTheme] = useState(storedTheme);
  
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = () => {
      if (!localStorage.getItem('theme')) {
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);
  
  const value = {
    currentTheme,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[currentTheme]}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;