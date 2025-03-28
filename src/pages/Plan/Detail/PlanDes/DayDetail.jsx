import { useMemo } from "react";
import { FaBusSimple } from "react-icons/fa6";
import { MdRunCircle } from "react-icons/md";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./DayDetail.module.css";
import Itinerary from "./Itinerary";
import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import CreateSchedule from "../ModalContents/CreateSchedule";
import { useDarkModeContext } from "@/contexts";

const timeToSeconds = (time) => {
  const [hh, mm, ss] = time.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
};

const DayDetail = ({ focus, hasPermission }) => {
  const { itineraries, deleteItinerary } = usePlanDetail();
  const { isDarkMode } = useDarkModeContext();

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

  const openGoogleMap = (busIndex) => {
    const address1 = contentData[busIndex].place.name;
    const address2 = contentData[busIndex + 1].place.name;
    const url = `https://www.google.com/maps/dir/${address1}/${address2}?hl=ko`;

    window.open(url);
  };

  const renderBusIcon = (count) => {
    return Array.from({ length: count }).map((_, idx) => (
      <div
        className={styles.bus_icon_wrapper}
        key={idx}
        onClick={() => openGoogleMap(idx)}
      >
        <FaBusSimple className={styles.bus_icon} />
      </div>
    ));
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.divider}>
        <MdRunCircle size={40} className={styles.icon} />
        <div className={styles.vertical_divider}>
          <div className={styles.vertical_bus_icons}>
            {renderBusIcon(contentData.length - 1)}
          </div>
        </div>
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
            <p>일정이 없습니다 !</p>

            {hasPermission && (
              <Modal>
                <ModalTrigger>
                  <Button variant="outline">해당 날짜의 일정추가 하기</Button>
                </ModalTrigger>
                <ModalContent>
                  <CreateSchedule focusDay={focus} />
                </ModalContent>
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayDetail;
