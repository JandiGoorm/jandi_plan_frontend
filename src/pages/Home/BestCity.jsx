import { CityCard, Loading, Slider } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BestCity.module.css";

const BestCity = () => {
  const { response, fetchData, loading } = useAxios();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id) => {
      const url = buildPath(PageEndPoints.DESTINATION_DETAIL, {
        id,
      });

      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    fetchData({ url: APIEndPoints.DESTINATION_BEST, method: "GET" });
  }, [fetchData]);

  if (loading) return <Loading isSection={true} style={{ height: "18rem" }} />;
  return (
    <div className={styles.container}>
      <div className={styles.slider_title_container}>
        <p className={styles.slider_title}>이런 여행지는 어때요 ?</p>
      </div>

      <Slider items={response ?? []}>
        {(item) => {
          return (
            <div
              key={item.cityId}
              onClick={() => handleNavigate(item.name)}
              style={{ position: "relative", height: "100%" }}
            >
              <CityCard item={item} />
            </div>
          );
        }}
      </Slider>
    </div>
  );
};

export default BestCity;
