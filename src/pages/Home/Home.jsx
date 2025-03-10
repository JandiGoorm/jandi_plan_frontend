import { BaseLayout } from "@/layouts";
import Banner from "./Banner";
import styles from "./Home.module.css";
import { Button, Slider } from "@/components";
import { useAxios } from "@/hooks";
import { PageEndPoints, APIEndPoints } from "@/constants";
import { useState, useEffect } from "react";
import MainContent from "./MainContent";

const HomePage = () => {
  const { loading, fetchData, response } = useAxios();
  const [destinations, setDestinations] = useState([]);
  const [plans, setPlans] = useState([]);
  const [filter, serFilter] = useState("");

  useEffect(()=> {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.DESTINATION_BEST}`,
      params: { filter },
    }).then((res)=>{
      setDestinations(res.data);
    }).catch((err) => {
      console.error(err);
    });

  },[fetchData]);

  useEffect(()=> {
    fetchData({
      method: "GET",
      url: `${APIEndPoints.PLAN_BEST}`,
    }).then((res)=>{
      setPlans(res.data);
    }).catch((err) => {
      console.error(err);
    });

  },[fetchData]);


  return (
    <BaseLayout>
      <div className={styles.container}>
        <Banner />

        <MainContent title="WHERE TO GO?" items={destinations} />
        <MainContent title="POPULAR PLANS?" items={plans} />
        
      </div>
    </BaseLayout>
  );
};

export default HomePage;
