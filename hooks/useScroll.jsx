import { useEffect, useRef } from "react";

// 自定义 useScroll Hook
const useScroll = (fetchData, threshold = 0) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current;
      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        // 判断是否滚动到底部
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
          fetchData();
        }
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchData, threshold]);

  return scrollRef;  //! 返回一个ref对象，用于绑定到需要监听滚动事件的元素上
};
