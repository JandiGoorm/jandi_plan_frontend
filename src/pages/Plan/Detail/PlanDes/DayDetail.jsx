import { useMemo } from "react";
import { MdRunCircle } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./DayDetail.module.css";
import Itinerary from "./Itinerary";

const timeToSeconds = (time) => {
  const [hh, mm, ss] = time.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
};

const DayDetail = ({ focus, hasPermission }) => {
  const { itineraries, deleteItinerary } = usePlanDetail();

  const contentData = useMemo(() => {
    if (!itineraries) return null;
    return itineraries
      .filter((v) => v.date === focus)
      .sort((a, b) => {
        return timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
      });
  }, [focus, itineraries]);

  if (!contentData) return null;
  const isContent = contentData.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <MdRunCircle size={40} className={styles.icon} />
        <div className={styles.vertical_divider}></div>
      </div>

      <div className={styles.container_right}>
        {isContent ? (
          contentData.map((itinerary) => (
            <Itinerary
              key={itinerary.itineraryId}
              itinerary={itinerary}
              hasPermission={hasPermission}
              deleteItinerary={deleteItinerary}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>해당 날짜의 일정이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayDetail;
