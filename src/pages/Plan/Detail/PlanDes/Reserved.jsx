import { formatPrice } from "@/utils";
import { TiDelete } from "react-icons/ti";
import { LuClipboardPen } from "react-icons/lu";
import styles from "./Reserved.module.css";
import { Modal, ModalContent, ModalTrigger, Tooltip } from "@/components";
import { usePlanDetail } from "../PlanDetailContext";
import ModifyReservation from "../ModalContents/ModifyReservation";

const Reserved = ({ reserved, hasPermission }) => {
  const { data } = reserved;
  const order = ["TRANSPORTATION", "ACCOMMODATION", "ETC"];

  const { deleteReservation } = usePlanDetail();

  return (
    <div className={styles.container}>
      {order.map((v) => {
        return (
          <div key={v} className={styles.des_item}>
            <p className={styles.des_title}>{v}</p>
            {(data[v] ?? []).map((item) => {
              return (
                <div
                  key={item.reservationId}
                  className={styles.rservation_container}
                >
                  <div className={styles.reservation_info}>
                    <p>{item.title}</p>
                    <p>{formatPrice(item.cost)}원</p>
                  </div>
                  {hasPermission && (
                    <div className={styles.icon_wrapper}>
                      <Modal>
                        <ModalTrigger>
                          <Tooltip text="수정">
                            <div className={styles.icon_box}>
                              <LuClipboardPen size={14} />
                            </div>
                          </Tooltip>
                        </ModalTrigger>
                        <ModalContent>
                          <ModifyReservation reservation={item} />
                        </ModalContent>
                      </Modal>

                      <Tooltip
                        text="삭제"
                        onClick={() => deleteReservation(item.reservationId)}
                      >
                        <div className={styles.icon_box}>
                          <TiDelete size={20} color="var(--color-red-500)" />
                        </div>
                      </Tooltip>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Reserved;
