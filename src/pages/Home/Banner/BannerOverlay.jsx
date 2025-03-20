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
  const title = banner.title;
  const desc = banner.subtitle;
  const bannersLength = allBanners.length;

  return (
    <div className={styles.embla_overlay}>
      <div className={styles.centered}>
        <div className={styles.banner_info}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={banner.title}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className={styles.title_container}
            >
              {title.split("\\n").map((line, index) => (
                <motion.div key={index} variants={lineVariants}>
                  <h1>{line}</h1>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              key={desc}
              variants={descContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className={styles.desc_container}
            >
              {desc?.split("\\n").map((line, index) => (
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
