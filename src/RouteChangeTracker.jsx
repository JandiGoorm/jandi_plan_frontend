import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeTracker() {
  const location = useLocation();
  const prevPath = useRef("");

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const referrer = prevPath.current || document.referrer;

    const eventData = {
      type: "pageview",
      page: currentPath,
      title: document.title,
      referrer,
      timestamp: new Date().toISOString(),
    };

    // 안전하게 Jennifer Front 이벤트 전송
    function sendJennifer() {
      if (window.jenniferFront && typeof window.jenniferFront === "function") {
        window.jenniferFront(eventData);
        console.log("[Jennifer] pageview sent:", currentPath);
      } else {
        setTimeout(sendJennifer, 100); // 0.1초 후 재시도
      }
    }

    sendJennifer();

    prevPath.current = currentPath;
  }, [location]);

  return null;
}
