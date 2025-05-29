import React, { useEffect, useState } from 'react';

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date().getTime();

    // 检查是否超过一天（24小时）
    if (!lastShown || now - parseInt(lastShown, 10) > 24 * 60 * 60 * 1000) {
      setIsVisible(true);
      localStorage.setItem('popupLastShown', now.toString());
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>这是一个一天只出现一次的弹窗。</p>
            <button onClick={handleClose}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;