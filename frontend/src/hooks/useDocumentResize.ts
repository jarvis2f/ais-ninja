import {useState, useEffect, useMemo} from 'react';

function useDocumentResize(target: HTMLElement = document.body) {
  const [rect, setRect] = useState({
    width: 0,
    height: 0
  });

  const isMobile = useMemo(() => {
	  	return rect.width < 768;
  }, [rect])

  useEffect(() => {
    const handleResize = () => {
      if (target) {
        setRect({
          width: target.offsetWidth,
          height: target.offsetHeight
        });
      }
    };

    // 添加resize事件监听器
    window.addEventListener('resize', handleResize);

    // 获取初始宽度
    if (target) {
      setRect({
        width: target.offsetWidth,
        height: target.offsetHeight
      });
    }

    // 在组件卸载时移除监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [target]);

  return {...rect, isMobile};
}

export default useDocumentResize;
