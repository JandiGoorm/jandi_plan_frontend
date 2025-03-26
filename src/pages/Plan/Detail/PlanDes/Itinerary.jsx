import { useRef } from "react";
import styles from "./Itinerary.module.css";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ModifySchedule from "../ModalContents/ModifySchedule";
import { formatPrice } from "@/utils";

const Itinerary = ({ itinerary, hasPermission, deleteItinerary }) => {
  const split = itinerary.startTime.split(":");
  const time = split[0] + ":" + split[1];
  const dropdownRef = useRef();

  return (
    <div key={itinerary.itineraryId} className={styles.content_wrapper}>
      <div className={styles.dashed} />
      <div className={styles.content_item}>
        <div className={styles.content_item_des}>
          <div className={styles.content_item_time}>{time}</div>
          <div className={styles.content_title}>{itinerary.title}</div>
        </div>

        <div className={styles.content_update}>
          <div className={styles.content_cost}>
            {formatPrice(itinerary.cost)} 원
          </div>

          {hasPermission && (
            <Modal>
              <DropDown dropdownRef={dropdownRef}>
                <DropDownTrigger>
                  <HiOutlineDotsVertical size={20} />
                </DropDownTrigger>

                <DropDownContent>
                  <div className={styles.dropdown_content}>
                    <ModalTrigger
                      onOpen={() => {
                        if (
                          dropdownRef.current &&
                          typeof dropdownRef.current.close === "function"
                        ) {
                          dropdownRef.current.close();
                        }
                      }}
                    >
                      <p className={styles.dropdown_content_item}>수정</p>
                    </ModalTrigger>

                    <p
                      className={styles.dropdown_content_item}
                      onClick={() => deleteItinerary(itinerary.itineraryId)}
                    >
                      삭제
                    </p>
                  </div>
                </DropDownContent>
              </DropDown>

              <ModalContent>
                <ModifySchedule item={itinerary} />
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
