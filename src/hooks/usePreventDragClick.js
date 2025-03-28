import { useRef } from "react";

const usePreventDragClick = () => {
  const clickPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    clickPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e, callback) => {
    const deltaX = Math.abs(e.clientX - clickPosition.current.x);
    const deltaY = Math.abs(e.clientY - clickPosition.current.y);

    if (deltaX < 5 && deltaY < 5) {
      callback();
    }
  };

  return { handleMouseDown, handleMouseUp };
};

export default usePreventDragClick;
