import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import JoingPage from "./Join/Join";
import LoginPage from "./Login/Login";
import FindPWPage from "./Find/Find";
import SocialPage from "./Social/Social";
import { APIEndPoints, PageEndPoints } from "@/constants";

const AuthLayout = () => {
  const location = useLocation();
  const exitTransitionX = location.pathname === PageEndPoints.JOIN ? 70 : -70;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left_box}>
          <p className={styles.title}>JUST PLAN IT !</p>
          <p className={styles.title_des}>여행 계획을 만들고, 공유 해보세요</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className={styles.right_box}
            initial={{ opacity: 0, x: exitTransitionX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitTransitionX }}
            transition={{ duration: 0.5 }}
          >
            <Routes location={location}>
              <Route path="login" element={<LoginPage />} />
              <Route path="join" element={<JoingPage />} />
              <Route path="findPW" element={<FindPWPage />} />
              <Route path="kakaoLogin" element={<SocialPage fetchUrl={APIEndPoints.KAKAO_LOGIN}/>} />
              <Route path="naverLogin" element={<SocialPage fetchUrl={APIEndPoints.NAVER_LOGIN}/>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthLayout;
