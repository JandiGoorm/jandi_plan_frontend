import Header from "@/layouts/BaseLayout/Header";
import styles from "./Banner.module.css";
import { usePlanDetail } from "../PlanDetailContext";
import { useEffect, useState } from "react";
import { Button, Modal, ModalContent, ModalTrigger } from "@/components";
import { RiImageEditLine } from "react-icons/ri";
import ModifyBanner from "../ModalContents/ModifyBanner";

const Banner = (user) => {
  const [banner, setBanner] = useState(); 
  const { tripDetail } = usePlanDetail();
  const isMine = tripDetail?.user.userId === user?.user.userId;

    useEffect(()=>{
      setBanner(tripDetail?.tripImageUrl || tripDetail?.cityImageUrl);
    },[tripDetail])

  return (
    <div
    className={styles.banner_container}
    style={{ backgroundImage: `url(${banner})` }}
  >
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
        <Header forceDark={true} />
      </div>
    </div>
    {isMine?(
      <div className={styles.banner_menu}>
        <Modal>
          <ModalTrigger>
            <Button size="lg" ><RiImageEditLine /></Button>
          </ModalTrigger>
          <ModalContent>
            <ModifyBanner banner={banner} id={tripDetail?.tripId}/>
          </ModalContent>
        </Modal>
      </div>
    ):(
      <></>
    )}

  </div>
  );
};

export default Banner;
