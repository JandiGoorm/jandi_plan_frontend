import { CityCard, Loading, Slider } from "@/components";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios, usePreventDragClick } from "@/hooks";
import { useCallback, useEffect } from "react";
import styles from "./BestCity.module.css";
import { buildPath } from "@/utils";
import { useNavigate } from "react-router-dom";

const BestCity = () => {
  const navigate = useNavigate();
  const { response, fetchData, loading } = useAxios();

  const { handleMouseDown, handleMouseUp } = usePreventDragClick();

  const callback = useCallback(
    (item) => {
      const path = buildPath(PageEndPoints.DESTINATION_DETAIL, {
        id: item.name,
      });
      navigate(path);
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
              onMouseDown={handleMouseDown}
              onMouseUp={(e) => handleMouseUp(e, () => callback(item))}
              style={{
                position: "relative",
                height: "100%",
              }}
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
