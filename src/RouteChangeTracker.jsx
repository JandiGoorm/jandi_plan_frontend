import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function RouteChangeTracker() {
  const location = useLocation();
  const prevPath = useRef("");

  console.log(location);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const referrer = prevPath.current || document.referrer;
    if (window.jenniferFront) {

      window.jenniferFront({
        type: "pageview",          // 페이지뷰 이벤트 타입
        page: currentPath,         // 현재 페이지 경로
        title: document.title,     // 페이지 타이틀
        referrer: referrer,        // 이전 페이지
        timestamp: new Date().toISOString(),
      });

      prevPath.current = currentPath;
    }
  }, [location]);

  return null;
}
