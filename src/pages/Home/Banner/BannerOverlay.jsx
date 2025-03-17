import styles from "./BannerOverlay.module.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  titleVariants,
  descContainerVariants,
  lineVariants,
} from "../constants";
import { useCarouselHandler } from "@/hooks";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const BannerOverlay = ({
  currentIndex,
  allBanners,
  emblaApi,
  setCurrentIndex,
}) => {
  const { onPrevButtonClick, onNextButtonClick } = useCarouselHandler(
    emblaApi,
    setCurrentIndex
  );

  if (currentIndex === null) return null;

  const banner = allBanners[currentIndex];
  const dummyDesc = {
    15: "네이버 ~~\n항공권 예약은 네이버 항공권에서",
    16: "외교부~~\n여권 발급은 외교부에서",
    17: "포털~~\n여행정보는 포털에서",
    18: "열기구~~\n열기구는 열기구에서",
  };
  const bannerTitle = `${banner.title}\n 테스트 테스트`;
  const burrentDesc = dummyDesc[banner.bannerId] || banner.desc || "ㅎㅇㅎㅇ";
  const bannersLength = allBanners.length;

  return (
    <div className={styles.embla_overlay}>
      <div className={styles.centered}>
        <div className={styles.banner_info}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={bannerTitle}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className={styles.title_container}
            >
              {bannerTitle.split("\n").map((line, index) => (
                <motion.div key={index} variants={lineVariants}>
                  <h1>{line}</h1>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              key={burrentDesc}
              variants={descContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className={styles.desc_container}
            >
              {burrentDesc.split("\n").map((line, index) => (
                <motion.div key={index} variants={lineVariants}>
                  <p>{line}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className={styles.pagination}>
            <button className={styles.button} onClick={onPrevButtonClick}>
              <MdKeyboardArrowLeft size={24} />
            </button>

            <div className={styles.pagination_text}>
              <p>{currentIndex + 1}</p>
              <p className={styles.slash}>/</p>
              <p className={styles.banners_length}>{bannersLength}</p>
            </div>

            <button className={styles.button} onClick={onNextButtonClick}>
              <MdKeyboardArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOverlay;
