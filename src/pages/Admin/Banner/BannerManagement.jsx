import {
  Button,
  Loading,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components";
import { useBanner } from "@/hooks";
import AddBanner from "./AddBanner";
import styles from "./BannerManagement.module.css";
import BannerTable from "./BannerTable";

const BannerManagement = () => {
  const { allBanner, addBanner, updateBanner, deleteBanner } = useBanner();

  if (!allBanner) return <Loading />;
  return (
    <div className={styles.container} id="banner">
      <div className={styles.header}>
        <p className={styles.title}>배너 관리</p>
        <Modal>
          <ModalTrigger>
            <Button size="sm" variant="ghost">
              배너 추가
            </Button>
          </ModalTrigger>
          <ModalContent>
            <AddBanner callback={addBanner} />
          </ModalContent>
        </Modal>
      </div>

      <BannerTable
        banners={allBanner}
        updateBanner={updateBanner}
        deleteBanner={deleteBanner}
      />
    </div>
  );
};

export default BannerManagement;
