import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import CreateReservation from "../ModalContents/CreateReservation";
import CreateSchedule from "../ModalContents/CreateSchedule";
import styles from "./PlanDes.module.css";
import "swiper/css";
import { usePlanDetail } from "../PlanDetailContext";
import Reserved from "./Reserved";
import DayDetail from "./DayDetail";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "@/contexts";
import { FaRegCalendarAlt } from "react-icons/fa";

const PlanDes = () => {
  const [data, setData] = useState([]);
  const { focusDay, reservations, tripDetail, setFocusDay, friends } =
    usePlanDetail();
  const { user } = useAuth();

  const isMine = user?.userId === tripDetail?.user.userId;
  const isFriend = friends?.some(
    (friend) => friend.participantUserId === user?.userId
  );

  const hasPermission = isMine || isFriend;

  const renderItem = useMemo(() => {
    if (focusDay === null && reservations) {
      return <Reserved reserved={reservations} hasPermission={hasPermission} />;
    }

    if (focusDay) {
      return <DayDetail focus={focusDay} hasPermission={hasPermission} />;
    }
  }, [focusDay, hasPermission, reservations]);

  useEffect(() => {
    if (!tripDetail) return;

    const { startDate, endDate } = tripDetail;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let temp = [];
    while (start <= end) {
      const date = start.toISOString().split("T")[0];
      const day =
        Math.floor((start - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      temp.push({ date, day });
      start.setDate(start.getDate() + 1);
    }

    setData(temp);
  }, [tripDetail]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FaRegCalendarAlt />
          <p>여행 일정을 작성해보세요 !</p>
        </div>

        {hasPermission && (
          <div className={styles.buttons}>
            <Modal>
              <ModalTrigger>
                <Button variant="ghost">예약추가</Button>
              </ModalTrigger>
              <ModalContent>
                <CreateReservation />
              </ModalContent>
            </Modal>

            <Modal>
              <ModalTrigger>
                <Button variant="ghost">일정추가</Button>
              </ModalTrigger>
              <ModalContent>
                <CreateSchedule />
              </ModalContent>
            </Modal>
          </div>
        )}
      </div>

      <div className={styles.des_container}>
        <div className={styles.des_nav}>
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            style={{
              margin: 0,
            }}
          >
            <SwiperSlide
              style={{ width: "auto", marginRight: "1px" }}
              onClick={() => setFocusDay(null)}
            >
              <div
                className={`${styles.des_nav_item} ${
                  !focusDay && styles.focus
                }`}
              >
                <p>RESERVED</p>
              </div>
            </SwiperSlide>

            {data.map((item) => {
              return (
                <SwiperSlide
                  key={item.day}
                  style={{ width: "auto", marginRight: "1px" }}
                  onClick={() => setFocusDay(item.date)}
                >
                  <div
                    className={`${styles.des_nav_item} ${
                      item.date === focusDay && styles.focus
                    }`}
                  >
                    <p>
                      {item.date} ({item.day}일차)
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {renderItem}
      </div>
    </div>
  );
};

export default PlanDes;
