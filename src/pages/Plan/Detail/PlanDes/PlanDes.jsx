import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { useAuth } from "@/contexts";
import { useEffect, useMemo, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import CreateReservation from "../ModalContents/CreateReservation";
import CreateSchedule from "../ModalContents/CreateSchedule";
import { usePlanDetail } from "../PlanDetailContext";
import DayDetail from "./DayDetail";
import DaySlider from "./DaySlider";
import styles from "./PlanDes.module.css";
import Reserved from "./Reserved";

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
                <Button
                  variant="ghost"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  예약추가
                </Button>
              </ModalTrigger>
              <ModalContent>
                <CreateReservation />
              </ModalContent>
            </Modal>

            <Modal>
              <ModalTrigger>
                <Button
                  variant="ghost"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  일정추가
                </Button>
              </ModalTrigger>
              <ModalContent>
                <CreateSchedule />
              </ModalContent>
            </Modal>
          </div>
        )}
      </div>

      <div className={styles.des_container}>
        <DaySlider items={data} setDay={setFocusDay} focusDay={focusDay} />
        {renderItem}
      </div>
    </div>
  );
};

export default PlanDes;
