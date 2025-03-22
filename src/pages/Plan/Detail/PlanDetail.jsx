import { APIProvider } from "@vis.gl/react-google-maps";
import styles from "./PlanDetail.module.css";
import PlanDetailProvider from "./PlanDetailProvider";
import PlanInfo from "./PlanInfo/PlanInfo";
import PlanDes from "./PlanDes/PlanDes";
import PlanBudget from "./PlanBudget/PlanBudget";
import PlanMap from "./PlanMap/PlanMap";
import Banner from "./Banner/Banner";

const PlanDetail = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <PlanDetailProvider>
      <APIProvider apiKey={API_KEY}>
        <div className={styles.container}>
          <Banner />
          <div className={styles.centered}>
            <PlanInfo />
            <PlanMap />
            <PlanDes />
            <PlanBudget />
          </div>
        </div>
      </APIProvider>
    </PlanDetailProvider>
  );
};

export default PlanDetail;
