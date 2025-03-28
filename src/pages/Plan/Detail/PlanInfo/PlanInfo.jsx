import {
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
  Tooltip,
} from "@/components";
import { APIEndPoints } from "@/constants";
import { useAuth, useToast } from "@/contexts";
import { useAxios } from "@/hooks";
import { buildPath } from "@/utils";
import { useEffect, useState } from "react";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import DeletePlan from "../ModalContents/DeletePlan";
import ModifyPlan from "../ModalContents/ModifyPlan";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./PlanInfo.module.css";
import ManageFriends from "../ModalContents/ManageFriends";

const PlanInfo = () => {
  const [liked, setLiked] = useState(false);
  const [withUser, setWithUser] = useState();

  const { user } = useAuth();
  const { tripDetail, friends } = usePlanDetail();
  const { createToast } = useToast();
  const { fetchData: postApi } = useAxios();

  const likedTrip = (setMethod, id) => {
    postApi({
      method: setMethod,
      url: buildPath(APIEndPoints.TRIP_SET_LIKED, { id }),
    })
      .then(() => {
        createToast({
          type: "success",
          text: "좋아요가 변경되었습니다",
        });
        setLiked((prev) => !prev);
      })
      .catch((err) => {
        createToast({
          type: "error",
          text: err.data.message,
        });
      });
  };

  useEffect(() => {
    setLiked(tripDetail?.liked);
    setWithUser(friends?.length + 1);
  }, [friends?.length, tripDetail?.liked]);

  if (!tripDetail) return null;
  const isMine = tripDetail.user.userId === user?.userId;

  return (
    <div className={styles.container}>
      <div className={styles.header_box}>
        <p className={styles.title}>{tripDetail.title}</p>
        {isMine ? (
          <div className={styles.header_menu}>
            <Modal>
              <ModalTrigger>
                <Button
                  variant="ghost"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  친구 관리
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ManageFriends
                  plan={tripDetail}
                  friends={friends}
                  user={user}
                />
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
                  수정
                </Button>
              </ModalTrigger>
              <ModalContent>
                <ModifyPlan plan={tripDetail} />
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
                  삭제
                </Button>
              </ModalTrigger>
              <ModalContent>
                <DeletePlan />
              </ModalContent>
            </Modal>
          </div>
        ) : (
          <div className={styles.header_menu}>
            {liked ? (
              <FaHeart
                size={24}
                onClick={() => likedTrip("DELETE", tripDetail.tripId)}
              />
            ) : (
              <FaRegHeart
                size={24}
                onClick={() => likedTrip("POST", tripDetail.tripId)}
              />
            )}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.flex_row}>
          <IoLocationSharp size={20} />
          <p>
            {tripDetail.countryName}, {tripDetail.cityName}
          </p>
        </div>

        <div className={styles.flex_row}>
          <BsPersonArmsUp size={20} />
          <Tooltip
            text={`${tripDetail.user.userName}${
              friends && friends.length > 0
                ? `, ${friends.map((f) => f.participantUserName).join(", ")}`
                : ""
            }`}
          >
            <p>{withUser} 명</p>
          </Tooltip>
        </div>

        <div className={styles.flex_row}>
          <MdDateRange size={20} />
          <p>
            {tripDetail.startDate} ~ {tripDetail.endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PlanInfo;
