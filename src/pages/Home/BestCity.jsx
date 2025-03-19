import { Loading, Slider } from "@/components";
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

  if (loading) return <Loading isSection={true} style={{ height: "18rem" }} />;
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
