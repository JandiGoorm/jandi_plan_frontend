import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import styles from "./Home.module.css";
import MainContent from "./MainContent";
import Header from "@/layouts/BaseLayout/Header";
import Footer from "@/layouts/BaseLayout/Footer";

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

      <div className={styles.centered}>
        <MainContent title="WHERE TO GO?" items={destinations} />
        <MainContent title="POPULAR PLANS?" items={plans} />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
