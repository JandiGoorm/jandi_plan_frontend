import Header from "@/layouts/BaseLayout/Header";
import styles from "./Banner.module.css";
import { usePlanDetail } from "../PlanDetailContext";
import { useEffect, useState } from "react";

const Banner = () => {
  const [banner, setBanner] = useState(); 
  const { tripDetail } = usePlanDetail();


    useEffect(()=>{
      setBanner(tripDetail?.tripImageUrl || tripDetail?.cityImageUrl);
    },[tripDetail])

  return (
    <div
    className={styles.banner_container}
    style={{ backgroundImage: `url(${banner})` }}
  >
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
        <Header forceDark={true} />
      </div>
    </div>
  </div>
  );
};

export default Banner;
