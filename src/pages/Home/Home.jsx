import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import styles from "./Home.module.css";
import Header from "@/layouts/BaseLayout/Header";
import Footer from "@/layouts/BaseLayout/Footer";
import SliderSection from "./SliderSection";
import { FaCrown } from "react-icons/fa";
import YoutubeSection from "./YoutubeSection";
import { motion } from "framer-motion";
import { sectionVariants } from "./constants";

const HomePage = () => {
  const { fetchData } = useAxios();
  const [destinations, setDestinations] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION_BEST}`,
    })
      .then((res) => {
        setDestinations(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchData]);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.PLAN_BEST}`,
    })
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <div className={styles.header_wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <Banner />
      </div>

      <motion.div
        className={styles.centered}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={sectionVariants}
      >
        <SliderSection items={destinations}>
          <div className={styles.slider_title_container}>
            <p className={styles.slider_title}>이런 여행지는 어때요 ?</p>
          </div>
        </SliderSection>
      </motion.div>

      <motion.div
        className={styles.centered}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={sectionVariants}
      >
        <SliderSection items={plans}>
          <div className={styles.slider_title_container}>
            <p className={styles.slider_title}>인기 추천지역</p>
            <div className={styles.slider_subtitle}>
              <FaCrown size={20} className={styles.crown_icon} />
              <p>BEST 여행지만 모아뒀어요</p>
            </div>
          </div>
        </SliderSection>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={sectionVariants}
        className={styles.motion_container}
      >
        <YoutubeSection />
      </motion.div>

      <div className={styles.centered}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
