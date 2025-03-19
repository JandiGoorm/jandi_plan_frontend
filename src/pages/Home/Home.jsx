import Banner from "./Banner/Banner";
import styles from "./Home.module.css";
import Header from "@/layouts/BaseLayout/Header";
import Footer from "@/layouts/BaseLayout/Footer/Footer";
import YoutubeSection from "./YoutubeSection";
import BestPlan from "./BestPlan";
import BestCity from "./BestCity";
import MotionLayout from "./MotionLayout";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header_wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <Banner />
      </div>

      <div className={styles.centered}>
        <MotionLayout viewport={{ once: true, amount: 0.7 }}>
          <BestCity />
        </MotionLayout>

        <MotionLayout viewport={{ once: true, amount: 0.7 }}>
          <BestPlan />
        </MotionLayout>
      </div>

      <MotionLayout viewport={{ once: true, amount: 0.7 }}>
        <YoutubeSection />
      </MotionLayout>

      <div className={styles.centered}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
