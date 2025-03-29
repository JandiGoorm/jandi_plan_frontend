import { APIProvider } from "@vis.gl/react-google-maps";
import PlanDetailProvider from "./PlanDetailProvider";
import PlanDetailWrapper from "./PlanDetailWrapper";

const PlanDetail = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <PlanDetailProvider>
      <APIProvider apiKey={API_KEY}>
        <PlanDetailWrapper />
      </APIProvider>
    </PlanDetailProvider>
  );
};

export default PlanDetail;
