import { Loading, PlanCard, Slider } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Destination.module.css";
import DestinationInfo from "./DestinationInfo/DestinationInfo";
import DestinationMap from "./DestinationMap/DestinationMap";
import Banner from "./Banner/Banner";
import MapSide from "./DestinationMap/MapSide";

const Destination = () => {
  const location = useLocation();
  const { cityName, cityId } = location.state;

  const {
    loading,
    fetchData: getDestination,
    response: destination,
  } = useAxios();

  const { fetchData: getPlans, response: plans } = useAxios();
  const { fetchData: getRestaurants, response: restaurants } = useAxios();

  const fetchRestaurants = useCallback(async () => {
    await getRestaurants({
      method: "POST",
      url: APIEndPoints.MAP_RESTAURANT,
      data: {
        cityId,
      },
    });
  }, [cityId, getRestaurants]);

  const fetchDestination = useCallback(async () => {
    await getDestination({
      method: "GET",
      url: APIEndPoints.DESTINATION,
      params: {
        category: "CITY",
        filter: cityName,
      },
    });
  }, [cityName, getDestination]);

  const fetchPlans = useCallback(async () => {
    await getPlans({
      method: "GET",
      url: APIEndPoints.TRIP_SEARCH,
      params: {
        category: "CITY",
        keyword: cityName,
      },
    });
  }, [cityName, getPlans]);

  useEffect(() => {
    fetchPlans();
    fetchDestination();
    fetchRestaurants();
  }, [fetchDestination, fetchPlans, fetchRestaurants]);

  if (loading || !destination) return <Loading />;
  const item = destination[0];

  return (
    <div className={styles.container}>
      <Banner item={item} />

      <div className={styles.centered}>
        <div className={styles.map_container}>
          {restaurants && <MapSide restaurants={restaurants} />}
          <DestinationMap
            latitude={item.latitude}
            longitude={item.longitude}
            restaurants={restaurants}
          />
        </div>

        <DestinationInfo latitude={item.latitude} longitude={item.longitude} />

        <div className={styles.plan_container}>
          <p className={styles.title}>{cityName}의 인기 계획</p>
          <Slider items={plans?.items || []} size="md">
            {(item) => (
              <>
                <PlanCard key={item.tripId} item={item} />
              </>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Destination;
