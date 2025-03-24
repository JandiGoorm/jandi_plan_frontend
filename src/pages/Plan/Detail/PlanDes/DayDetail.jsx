import styles from "./DayDetail.module.css";
import { MdRunCircle } from "react-icons/md";
import { formatPrice } from "@/utils";
import { TiDelete } from "react-icons/ti";
import { LuClipboardPen } from "react-icons/lu";
import { Modal, ModalContent, ModalTrigger, Tooltip } from "@/components";
import { usePlanDetail } from "../PlanDetailContext";
import { useMemo } from "react";
import ModifySchedule from "../ModalContents/ModifySchedule";

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
        <MdRunCircle size={40} color="var(--color-indigo-400)" />
        <div className={styles.vertical_divider}></div>
      </div>

      <div className={styles.container_right}>
        {isContent ? (
          contentData.map((v) => {
            const split = v.startTime.split(":");
            const time = split[0] + ":" + split[1];

            return (
              <div key={v.itineraryId} className={styles.content_wrapper}>
                <div className={styles.dashed} />
                <div className={styles.content_item}>
                  <div className={styles.content_item_des}>
                    <div className={styles.content_item_time}>{time}</div>
                    <div className={styles.content_title}>{v.title}</div>
                  </div>

                  <div className={styles.content_update}>
                    <div className={styles.content_cost}>
                      {formatPrice(v.cost)} 원
                    </div>

                    {hasPermission && (
                      <div className={styles.icon_wrapper}>
                        <Modal>
                          <ModalTrigger>
                            <Tooltip text={"수정"}>
                              <div className={styles.icon_box}>
                                <LuClipboardPen
                                  size={18}
                                  color="var(--color-text-dynamic)"
                                />
                              </div>
                            </Tooltip>
                          </ModalTrigger>
                          <ModalContent>
                            <ModifySchedule item={v} />
                          </ModalContent>
                        </Modal>

                        <Tooltip
                          text={"삭제"}
                          onClick={() => deleteItinerary(v.itineraryId)}
                        >
                          <div className={styles.icon_box}>
                            <TiDelete size={24} color="var(--color-red-500)" />
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
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
