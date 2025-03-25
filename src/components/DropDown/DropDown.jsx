import { DropDownContext } from "./DropDownContext";
import { useDropDown } from "./DropDownContext";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import styles from "./DropDown.module.css";
import { createPortal } from "react-dom";

const DropDown = ({ children, style = {}, dropdownRef = null }) => {
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const contentRef = useRef(null);

  const handleClickTrigger = useCallback((e) => {
    e.stopPropagation();
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(
    dropdownRef,
    () => ({
      close,
    }),
    [close]
  );

  const updatePosition = useCallback(() => {
    if (!ref.current || !contentRef.current || !isVisible) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;

    let top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.left + window.scrollX;

    if (viewportWidth - triggerRect.left < contentRect.width) {
      left = triggerRect.right - contentRect.width + window.scrollX;
    }

    setPosition({ top, left });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropDownContext.Provider
      value={{
        onClick: handleClickTrigger,
        isVisible,
        close,
        contentRef,
        position,
      }}
    >
      <div className={styles.container} ref={ref} style={style}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children, style = {} }) => {
  const { onClick } = useDropDown();

  return (
    <div onClick={onClick} className={styles.trigger} style={style}>
      {children}
    </div>
  );
};

const DropDownContent = ({ children }) => {
  const { isVisible, contentRef, position } = useDropDown();
  if (!isVisible) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={styles.content}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export { DropDown, DropDownTrigger, DropDownContent };
