import { Loading, PlanCard, Slider } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Destination.module.css";
import DestinationInfo from "./DestinationInfo/DestinationInfo";
import DestinationMap from "./DestinationMap/DestinationMap";
import Banner from "./Banner/Banner";
import MapSide from "./DestinationMap/MapSide";

const Destination = () => {
  const { id } = useParams();

  const {
    loading,
    fetchData: getDestination,
    response: destination,
  } = useAxios();

  const { fetchData: getPlans, response: plans } = useAxios();

  const {
    fetchData: getRestaurants,
    response: restaurants,
    loading: restaurantsLoading,
  } = useAxios();

  // 맛집 가져오기
  const fetchRestaurants = useCallback(
    async (cityId) => {
      await getRestaurants({
        method: "POST",
        url: APIEndPoints.MAP_RESTAURANT,
        data: {
          cityId,
        },
      });
    },
    [getRestaurants]
  );

  // 도시 정보 가져오기
  const fetchDestination = useCallback(async () => {
    return await getDestination({
      method: "GET",
      url: APIEndPoints.DESTINATION,
      params: {
        category: "CITY",
        filter: id,
      },
    });
  }, [getDestination, id]);

  //인기 계획 가져오기
  const fetchPlans = useCallback(async () => {
    await getPlans({
      method: "GET",
      url: APIEndPoints.TRIP_SEARCH,
      params: {
        category: "CITY",
        keyword: id,
      },
    });
  }, [getPlans, id]);

  useEffect(() => {
    fetchPlans();
    fetchDestination().then((res) => {
      const cityId = res.data[0].cityId;
      fetchRestaurants(cityId);
    });
  }, [fetchDestination, fetchPlans, fetchRestaurants]);

  if (loading || !destination) return <Loading />;
  const item = destination[0];

  if (!item) return <p>존재하지 않는 페이지 입니다.</p>;
  return (
    <div className={styles.container}>
      <Banner item={item} />

      <div className={styles.centered}>
        <div className={styles.map_container}>
          <MapSide restaurants={restaurants} loading={restaurantsLoading} />

          <DestinationMap
            latitude={item.latitude}
            longitude={item.longitude}
            restaurants={restaurants}
          />
        </div>

        <DestinationInfo latitude={item.latitude} longitude={item.longitude} />

        <div className={styles.plan_container}>
          <p className={styles.title}>{id}의 최근 업로드된 계획</p>

          <Slider items={plans?.items || []} size="md">
            {(item) => <PlanCard key={item.tripId} item={item} />}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Destination;
