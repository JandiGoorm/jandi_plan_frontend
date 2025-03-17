import { Slider } from "@/components";
import styles from "./BestCity.module.css";
import { useAxios } from "@/hooks";
import { useCallback, useEffect } from "react";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { buildPath } from "@/utils";
import { useNavigate } from "react-router-dom";

const BestCity = () => {
  const { response, fetchData, loading } = useAxios();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (item) => {
      const url = buildPath(PageEndPoints.DESTINATION_DETAIL, {
        id: item.cityId,
      });
      navigate(url, { state: { cityName: item.name, cityId: item.cityId } });
    },
    [navigate]
  );

  useEffect(() => {
    fetchData({ url: APIEndPoints.DESTINATION_BEST, method: "GET" });
  }, [fetchData]);

  if (loading) return null;
  return (
    <div className={styles.container}>
      <div className={styles.slider_title_container}>
        <p className={styles.slider_title}>이런 여행지는 어때요 ?</p>
      </div>

      <Slider items={response ?? []}>
        {(item) => {
          return (
            <>
              <div
                className={styles.img_container}
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                }}
                onClick={() => handleNavigate(item)}
              />
              <div className={styles.dest_container}>
                <div className={styles.dest_title}>
                  <p className={styles.dest_name}>{item.name}</p>
                </div>
              </div>
            </>
          );
        }}
      </Slider>
    </div>
  );
};

export default BestCity;
