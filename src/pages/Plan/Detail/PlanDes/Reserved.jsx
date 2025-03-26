import { formatPrice } from "@/utils";
import styles from "./Reserved.module.css";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { usePlanDetail } from "../PlanDetailContext";
import ModifyReservation from "../ModalContents/ModifyReservation";
import { reservedMap } from "../constants";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDarkModeContext } from "@/contexts";

const Reserved = ({ reserved, hasPermission }) => {
  const { isDarkMode } = useDarkModeContext();
  const { data } = reserved;

  const { deleteReservation } = usePlanDetail();

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      {Object.entries(reservedMap).map(([key, value]) => {
        const { label, icon } = value;

        return (
          <div key={key} className={styles.des_item}>
            <div className={styles.des_title}>
              {icon && icon}
              <p>{label}</p>
            </div>

            <div className={styles.scroll_wrapper}>
              {(data[key] ?? []).map((item, index) => {
                return (
                  <Modal key={item.reservationId}>
                    <ModalTrigger>
                      <div className={styles.reservation_container}>
                        <div className={styles.flex_row}>
                          <p
                            className={styles.reservation_index}
                            style={{
                              borderBottom:
                                index === (data[key]?.length || 0) - 1
                                  ? "none"
                                  : "",
                            }}
                          >
                            {index + 1}
                          </p>

                          <div className={styles.reservation_info}>
                            <p>{item.title}</p>
                            <p>{formatPrice(item.cost)}원</p>
                          </div>
                        </div>

                        <DropDown>
                          <DropDownTrigger>
                            <HiOutlineDotsVertical size={20} />
                          </DropDownTrigger>
                          <DropDownContent>
                            <div className={styles.dropdown_content}>
                              <p
                                className={styles.dropdown_content_item}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteReservation(item.reservationId);
                                }}
                              >
                                삭제
                              </p>
                            </div>
                          </DropDownContent>
                        </DropDown>
                      </div>
                    </ModalTrigger>

                    {hasPermission && (
                      <ModalContent>
                        <ModifyReservation reservation={item} />
                      </ModalContent>
                    )}
                  </Modal>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reserved;
